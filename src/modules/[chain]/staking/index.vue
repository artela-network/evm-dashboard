<script lang="ts" setup>
import {
    useBaseStore,
    useBlockchain,
    useFormatter,
    useMintStore,
    useStakingStore,
    useWalletStore,
    useTxDialog,
} from '@/stores';
import { computed, onMounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import type { Key, SlashingParam, Validator } from '@/types';
import { formatSeconds } from '@/libs/utils'
import { bech32 } from 'bech32';
import { diff } from 'semver';
const props = defineProps(['chain']);

const staking = useStakingStore();
const base = useBaseStore();
const format = useFormatter();
const dialog = useTxDialog();
const chainStore = useBlockchain();
const mintStore = useMintStore()
const walletStore = useWalletStore();
const blockchain = useBlockchain();


const cache = JSON.parse(localStorage.getItem('avatars') || '{}');
const avatars = ref(cache || {});
const latest = ref({} as Record<string, number>);
const yesterday = ref({} as Record<string, number>);
const tab = ref('active');
const unbondList = ref([] as Validator[]);
const slashing = ref({} as SlashingParam)
const isDataLoaded = ref(false);

onMounted(async () => {
    try {
        await Promise.all([
            staking.fetchUnbondingValdiators().then((res) => {
                unbondList.value = res.concat(unbondList.value);
            }),
            staking.fetchInacitveValdiators().then((res) => {
                unbondList.value = unbondList.value.concat(res);
            }),
            chainStore.rpc.getSlashingParams().then(res => {
                slashing.value = res.params
            }),
            walletStore.loadMyAsset()
        ]);
        isDataLoaded.value = true;
    } catch (error) {
        console.error("Error loading data:", error);
    }
});

watch(() => chainStore.chainName, async (newChain, oldChain) => {
    if (newChain !== oldChain) {
        isDataLoaded.value = false;
        // 重新加载数据
        // 可以调用一个包含所有加载逻辑的函数
        await loadAllData();
        isDataLoaded.value = true;
    }
});

async function loadAllData() {
    try {
        await Promise.all([
            staking.fetchUnbondingValdiators().then((res) => {
                unbondList.value = res.concat(unbondList.value);
            }),
            staking.fetchInacitveValdiators().then((res) => {
                unbondList.value = unbondList.value.concat(res);
            }),
            chainStore.rpc.getSlashingParams().then(res => {
                slashing.value = res.params
            }),
            walletStore.loadMyAsset()
        ]);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function updateState() {
    walletStore.loadMyAsset()
}
async function fetchChange(blockWindow: number = 14400) {
    let page = 0;

    let height = Number(base.latest?.block?.header?.height || 0);
    if (height > blockWindow) {
        height -= blockWindow;
    } else {
        height = 1;
    }
    // voting power in 24h ago
    while (page < staking.validators.length && height > 0) {
        await base.fetchValidatorByHeight(height, page).then((x) => {
            x.validators.forEach((v) => {
                yesterday.value[v.pub_key.key] = Number(v.voting_power);
            });
        });
        page += 100;
    }

    page = 0;
    // voting power for now
    while (page < staking.validators.length) {
        await base.fetchLatestValidators(page).then((x) => {
            x.validators.forEach((v) => {
                latest.value[v.pub_key.key] = Number(v.voting_power);
            });
        });
        page += 100;
    }
}



const changes = computed(() => {
    const changes = {} as Record<string, number>;
    Object.keys(latest.value).forEach((k) => {
        const l = latest.value[k] || 0;
        const y = yesterday.value[k] || 0;
        changes[k] = l - y;
    });
    return changes;
});

const change24 = (entry: { consensus_pubkey: Key; tokens: string }) => {
    const txt = entry.consensus_pubkey.key;
    // const n: number = latest.value[txt];
    // const o: number = yesterday.value[txt];
    // // console.log( txt, n, o)
    // return n > 0 && o > 0 ? n - o : 0;

    const latestValue = latest.value[txt];
    if (!latestValue) {
        return 0;
    }

    const displayTokens = format.tokenAmountNumber({
        amount: parseInt(entry.tokens, 10).toString(),
        denom: staking.params.bond_denom,
    });
    const coefficient = displayTokens / latestValue;
    return changes.value[txt] * coefficient;
};

const change24Text = (entry: { consensus_pubkey: Key; tokens: string }) => {
    if (!entry) return '';
    const v = change24(entry);
    return v && v !== 0 ? format.showChanges(v) : '';
};

const change24Color = (entry: { consensus_pubkey: Key; tokens: string }) => {
    if (!entry) return '';
    const v = change24(entry);
    if (v > 0) return 'text-success';
    if (v < 0) return 'text-error';
};

const calculateRank = function (position: number) {
    let sum = 0;
    for (let i = 0; i < position; i++) {
        sum += Number(staking.validators[i]?.delegator_shares);
    }
    const percent = sum / staking.totalPower;

    switch (true) {
        case tab.value === 'active' && percent < 0.33:
            return 'error';
        case tab.value === 'active' && percent < 0.67:
            return 'warning';
        default:
            return 'primary';
    }
};

function isFeatured(endpoints: string[], who?: { website?: string, moniker: string }) {
    if (!endpoints || !who) return false
    return endpoints.findIndex(x => who.website && who.website?.substring(0, who.website?.lastIndexOf('.')).endsWith(x) || who?.moniker?.toLowerCase().search(x.toLowerCase()) > -1) > -1
}

const list = computed(() => {
    if (tab.value === 'active') {
        return staking.validators.map((x, i) => ({ v: x, rank: calculateRank(i), logo: logo(x.description.identity) }));
    } else if (tab.value === 'featured') {
        const endpoint = chainStore.current?.endpoints?.rest?.map(x => x.provider)
        if (endpoint) {
            endpoint.push('ping')
            return staking.validators
                .filter(x => isFeatured(endpoint, x.description))
                .map((x, i) => ({ v: x, rank: 'primary', logo: logo(x.description.identity) }));
        }
        return []
    }
    return unbondList.value.map((x, i) => ({ v: x, rank: 'primary', logo: logo(x.description.identity) }));
});

const fetchAvatar = (identity: string) => {
    // fetch avatar from keybase
    return new Promise<void>((resolve) => {
        staking
            .keybase(identity)
            .then((d) => {
                if (Array.isArray(d.them) && d.them.length > 0) {
                    const uri = String(d.them[0]?.pictures?.primary?.url).replace(
                        'https://s3.amazonaws.com/keybase_processed_uploads/',
                        ''
                    );

                    avatars.value[identity] = uri;
                    resolve();
                } else throw new Error(`failed to fetch avatar for ${identity}`);
            })
            .catch((error) => {
                // console.error(error); // uncomment this if you want the user to see which avatars failed to load.
                resolve();
            });
    });
};

const loadAvatar = (identity: string) => {
    // fetches avatar from keybase and stores it in localStorage
    fetchAvatar(identity).then(() => {
        localStorage.setItem('avatars', JSON.stringify(avatars.value));
    });
};

// wallet box
const change = computed(() => {
    const token = walletStore.balanceOfStakingToken;
    return token ? format.priceChanges(token.denom) : 0;
});
const color = computed(() => {
    switch (true) {
        case change.value > 0:
            return 'text-green-600';
        case change.value === 0:
            return 'text-grey-500';
        case change.value < 0:
            return 'text-red-600';
    }
});
function cosmosToEvmAddress(cosmosAddress: string): string {
    // 检查地址长度和前缀
    if (!cosmosAddress || cosmosAddress.length < 10 || !cosmosAddress.startsWith('art')) {
        console.error('Invalid Cosmos address');
        return ''; // 返回空字符串表示无效地址
    }

    try {
        // 解码 Bech32 地址
        const decoded = bech32.decode(cosmosAddress);
        const pubkeyHash = new Uint8Array(bech32.fromWords(decoded.words));

        // 将公钥哈希转换为 EVM 地址
        const evmAddress = '0x' + Array.from(pubkeyHash)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');

        return evmAddress;
    } catch (error) {
        console.error('Failed to decode address:', error);
        return ''; // 返回空字符串表示解码失败
    }
}
const loadAvatars = () => {
    // fetches all avatars from keybase and stores it in localStorage
    const promises = staking.validators.map((validator) => {
        const identity = validator.description?.identity;

        // Here we also check whether we haven't already fetched the avatar
        if (identity && !avatars.value[identity]) {
            return fetchAvatar(identity);
        } else {
            return Promise.resolve();
        }
    });

    Promise.all(promises).then(() =>
        localStorage.setItem('avatars', JSON.stringify(avatars.value))
    );
};

const logo = (identity?: string) => {
    if (!identity || !avatars.value[identity]) return '';
    const url = avatars.value[identity] || '';
    return url.startsWith('http')
        ? url
        : `https://s3.amazonaws.com/keybase_processed_uploads/${url}`;
};

const loaded = ref(false);
base.$subscribe((_, s) => {
    if (s.recents.length >= 2 && loaded.value === false) {
        loaded.value = true;
        const diff_time = Date.parse(s.recents[1].block.header.time) - Date.parse(s.recents[0].block.header.time)
        const diff_height = Number(s.recents[1].block.header.height) - Number(s.recents[0].block.header.height)
        const block_window = Number(Number(86400 * 1000 * diff_height / diff_time).toFixed(0))
        fetchChange(block_window);
    }
});

const openLink = () => {
    window.open('https://docs.artela.network/develop/validate/Delegators', '_blank');
}

loadAvatars();
</script>
<template>
    <div v-if="isDataLoaded">
        <div class="flex gap-4 bg-base-100 rounded mt-4 shadow py-5 px-6">
            <div class="w-[100px] flex-shrink-0">
                <img src="../../../assets/page/staking.png" />
            </div>
            <div class="flex flex-col gap-2 justify-around py-5">
                <div class="text-xl font-medium">
                    Maximize On-Chain Returns by Staking Your ART
                </div>
                <div class="text-sm">
                    Maximize your returns through ART staking: lock in your tokens to earn stable and predictable
                    rewards, with an annual yield of up to 7.2%. Additionally, gain voting rights to support the
                    on-chain proposals you believe in. Tokens can be unlocked at any time.
                </div>
            </div>
            <div class="text-[#0000c9] cursor-pointer" @click="openLink">
                More
            </div>
        </div>

        <div class="bg-base-100 rounded mt-4 shadow pt-4">
            <div class="text-lg font-medium px-4">
                My Balance
            </div>
            <div class="grid grid-cols-1 md:!grid-cols-4 auto-cols-auto gap-4 px-4 pb-6 mt-4">
                <div class="flex flex-row items-center">
                    <div class="w-[44px]">
                        <img src="../../../assets/page/logo1.svg" />
                    </div>
                    <div class="rounded-sm px-4 py-3">
                        <div class="text-sm mb-1">{{ $t('account.balance') }}</div>
                        <div class="text-lg font-medium text-main">
                            {{ format.formatToken(walletStore.balanceOfStakingToken) }}
                        </div>
                    </div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="w-[44px]">
                        <img src="../../../assets/page/logo2.svg" />
                    </div>
                    <div class="rounded-sm px-4 py-3">
                        <div class="text-sm mb-1">{{ $t('module.staking') }}</div>
                        <div class="text-lg font-medium text-main">
                            {{ format.formatToken(walletStore.stakingAmount) }}
                        </div>
                    </div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="w-[44px]">
                        <img src="../../../assets/page/logo3.svg" />
                    </div>
                    <div class="rounded-sm px-4 py-3">
                        <div class="text-sm mb-1">{{ $t('index.reward') }}</div>
                        <div class="text-lg font-medium text-main">
                            {{ format.formatToken(walletStore.rewardAmount) }}
                        </div>
                    </div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="w-[44px]">
                        <img src="../../../assets/page/logo4.svg" />
                    </div>
                    <div class="rounded-sm px-4 py-3">
                        <div class="text-sm mb-1">{{ $t('index.unbonding') }}</div>
                        <div class="text-lg font-medium text-main">
                            {{ format.formatToken(walletStore.unbondingAmount) }}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-6">
            <div class="flex items-center justify-between py-1 bg-[#E6F4FF] px-3">
                <div class="tabs tabs-boxed bg-transparent">
                    <a class="tab text-gray-400" :class="{ 'bg-[#0000C9] text-white': tab === 'featured' }"
                        @click="tab = 'featured'">{{ $t('staking.popular') }}</a>
                    <a class="tab text-gray-400" :class="{ 'bg-[#0000C9] text-white': tab === 'active' }"
                        @click="tab = 'active'">{{
                            $t('staking.active') }}</a>
                    <a class="tab text-gray-400" :class="{ 'bg-[#0000C9] text-white': tab === 'inactive' }"
                        @click="tab = 'inactive'">{{ $t('staking.inactive') }}</a>
                </div>

                <div class="text-lg font-semibold">
                    {{ list.length }}/{{ staking.params.max_validators }}
                </div>
            </div>

            <div class="bg-base-100 px-4 pt-3 pb-4 rounded shadow">
                <div class="overflow-x-auto">
                    <table class="text-[#00001499] w-full">
                        <thead class="bg-base-100">
                            <tr>
                                <th scope="col" class="uppercase font-normal" style="width: 3rem; position: relative">
                                    {{ $t('staking.rank') }}
                                </th>
                                <th scope="col" class="uppercase font-normal">{{ $t('staking.validator') }}</th>
                                <th scope="col" class="text-right uppercase font-normal">{{ $t('staking.voting_power')
                                    }}</th>
                                <!-- <th scope="col" class="text-right uppercase font-normal">{{ $t('staking.24h_changes') }}</th> -->
                                <th scope="col"
                                    class="text-right uppercase font-normal flex justify-center items-center">
                                    {{ $t('staking.commission') }}
                                    <button class="tooltip tooltip-bottom"
                                        data-tip="The validator's fee rate will be applied; your effective yield = annual yield * (1 - commission).">
                                        <img src="../../../assets/tip.svg" />
                                    </button>
                                </th>
                                <th scope="col" class="text-center uppercase font-normal">{{ $t('staking.actions') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="({ v, rank, logo }, i) in list" :key="v.operator_address"
                                class="hover:bg-gray-100 dark:hover:bg-[#384059]">
                                <!-- 👉 rank -->
                                <td>
                                    <div class="text-xs truncate relative px-2 py-1 rounded-full w-fit"
                                        :class="`text-${rank}`">
                                        <span class="inset-x-0 inset-y-0 opacity-10 absolute"
                                            :class="`bg-${rank}`"></span>
                                        {{ i + 1 }}
                                    </div>
                                </td>
                                <!-- 👉 Validator -->
                                <td class="flex">
                                    <div class="flex items-center overflow-hidden" style="max-width: 300px">
                                        <div class="avatar mr-4 ml-6 relative w-8 h-8 rounded-full">
                                            <div class="w-8 h-8 rounded-full bg-gray-400 absolute opacity-10"></div>
                                            <div class="w-8 h-8 rounded-full">
                                                <img v-if="logo" :src="logo" class="object-contain" @error="(e) => {
                                                    const identity = v.description?.identity;
                                                    if (identity) loadAvatar(identity);
                                                }
                                                    " />
                                                <Icon v-else class="text-3xl" :icon="`mdi-help-circle-outline`" />

                                            </div>
                                        </div>

                                        <div class="flex flex-col">
                                            <span
                                                class="text-sm text-primary dark:invert whitespace-nowrap overflow-hidden">
                                                <RouterLink :to="{
                                                    name: 'chain-staking-validator',
                                                    params: {
                                                        validator:
                                                            v.operator_address,
                                                    },
                                                }" class="font-weight-medium">
                                                    {{ v.description?.moniker }}
                                                </RouterLink>
                                            </span>
                                            <span class="text-xs">{{
                                                v.description?.website ||
                                                v.description?.identity ||
                                                '-'
                                            }}</span>
                                        </div>
                                    </div>
                                </td>

                                <!-- 👉 Voting Power -->
                                <td class="text-right">
                                    <div class="flex flex-col">
                                        <h6 class="text-sm font-weight-medium whitespace-nowrap ">
                                            {{
                                                format.formatToken(
                                                    {
                                                        amount: parseInt(
                                                            v.tokens
                                                        ).toString(),
                                                        denom: staking.params
                                                            .bond_denom,
                                                    },
                                                    true,
                                                    '0,0'
                                                )
                                            }}
                                        </h6>
                                        <span class="text-xs">{{
                                            format.calculatePercent(
                                                v.delegator_shares,
                                                staking.totalPower
                                            )
                                        }}</span>
                                    </div>
                                </td>
                                <!-- 👉 24h Changes -->
                                <!-- <td class="text-right text-xs" :class="change24Color(v)">
                                    {{ change24Text(v) }}
                                </td> -->
                                <!-- 👉 commission -->
                                <td class="text-right text-xs">
                                    {{
                                        format.formatCommissionRate(
                                            v.commission?.commission_rates?.rate
                                        )
                                    }}
                                </td>
                                <!-- 👉 Action -->
                                <td class="text-center">
                                    <div v-if="v.jailed" class="badge badge-error gap-2 text-white">
                                        {{ $t('staking.jailed') }}
                                    </div>
                                    <label v-else for="delegate"
                                        class="btn btn-sm btn-primary text-[#0000C9] border-transparent bg-[#F1F5FF] rounded-sm capitalize"
                                        @click="
                                            dialog.open('delegate', {
                                                validator_address:
                                                    v.operator_address,
                                            })
                                            ">{{ $t('account.btn_delegate') }}</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="divider"></div>
                <div class="flex flex-row items-center">
                    <div class="text-xs truncate relative py-2 px-4 rounded-md w-fit text-error mr-2">
                        <span class="inset-x-0 inset-y-0 opacity-10 absolute bg-error"></span>
                        {{ $t('staking.top') }} 33%
                    </div>
                    <div class="text-xs truncate relative py-2 px-4 rounded-md w-fit text-warning">
                        <span class="inset-x-0 inset-y-0 opacity-10 absolute bg-warning"></span>
                        {{ $t('staking.top') }} 67%
                    </div>
                    <div class="text-xs hidden md:!block pl-2">
                        {{ $t('staking.description') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <!-- 加载指示器或占位符 -->
        Loading staking data...
    </div>
</template>

<route>
  {
    meta: {
      i18n: 'staking',
      order: 2,
      icon: 'stak.svg'
    },
  }
</route>

<style>
.staking-table.table :where(th, td) {
    padding: 8px 5px;
    background: transparent;
}
</style>
