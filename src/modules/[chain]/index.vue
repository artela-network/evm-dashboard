<script lang="ts" setup>
import MdEditor from 'md-editor-v3';
import PriceMarketChart from '@/components/charts/PriceMarketChart.vue';

import { Icon } from '@iconify/vue';
import {
  useBlockchain,
  useFormatter,
  useTxDialog,
  useWalletStore,
  useStakingStore,
  useParamStore,
} from '@/stores';
import { onMounted, ref } from 'vue';
import { useIndexModule, colorMap } from './indexStore';
import { computed } from '@vue/reactivity';

import CardStatisticsVertical from '@/components/CardStatisticsVertical.vue';
import ProposalListItem from '@/components/ProposalListItem.vue';
import ArrayObjectElement from '@/components/dynamic/ArrayObjectElement.vue'
import bech32 from 'bech32';
const props = defineProps(['chain']);

const blockchain = useBlockchain();
const store = useIndexModule();
const walletStore = useWalletStore();
const format = useFormatter();
const dialog = useTxDialog();
const stakingStore = useStakingStore();
const paramStore = useParamStore()
const coinInfo = computed(() => {
  return store.coinInfo;
});

onMounted(() => {
  store.loadDashboard();
  walletStore.loadMyAsset();
  paramStore.handleAbciInfo()
  // if(!(coinInfo.value && coinInfo.value.name)) {
  // }
});
const ticker = computed(() => store.coinInfo.tickers[store.tickerIndex]);

const currName = ref("")
blockchain.$subscribe((m, s) => {
  if (s.chainName !== currName.value) {
    currName.value = s.chainName
    store.loadDashboard();
    walletStore.loadMyAsset();
    paramStore.handleAbciInfo()
  }
});
function shortName(name: string, id: string) {
  return name.toLowerCase().startsWith('ibc/') ||
    name.toLowerCase().startsWith('0x')
    ? id
    : name;
}

const comLinks = [
  {
    name: 'Website',
    icon: 'mdi-web',
    href: store.homepage,
  },
  {
    name: 'Twitter',
    icon: 'mdi-twitter',
    href: store.twitter,
  },
  {
    name: 'Telegram',
    icon: 'mdi-telegram',
    href: store.telegram,
  },
  {
    name: 'Github',
    icon: 'mdi-github',
    href: store.github,
  },
];

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

function updateState() {
  walletStore.loadMyAsset()
}

function trustColor(v: string) {
  return `text-${colorMap(v)}`
}

const quantity = ref(100)
const qty = computed({
  get: () => {
    return parseFloat(quantity.value.toFixed(6))
  },
  set: val => {
    quantity.value = val
  }
})
const amount = computed({
  get: () => {
    return quantity.value * ticker.value.converted_last.usd || 0
  },
  set: val => {
    quantity.value = val / ticker.value.converted_last.usd || 0
  }
})

function cosmosToEvmAddress(cosmosAddress: string): string {
  // 检查 bech32 是否已正确导入
  if (!cosmosAddress) {
    return ''
  }

  // 解码 Bech32 地址
  const decoded = bech32.decode(cosmosAddress);
  const pubkeyHash = new Uint8Array(bech32.fromWords(decoded.words));

  // 将公钥哈希转换为 EVM 地址
  const evmAddress = '0x' + Array.from(pubkeyHash)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return evmAddress;
}

</script>

<template>
  <div>
    <div class="bg-base-100 rounded mt-4 shadow">
      <div class="flex justify-between px-4 pt-4 pb-2 text-lg font-semibold text-main">
        <div class="flex flex-col gap-2">
          <div class="text-lg font-medium">
            Current Address
          </div>
          <div class="flex flex-row w-full gap-4">
            <span class="text-[#000014B2] truncate text-sm underline underline-offset-1">{{
              cosmosToEvmAddress(walletStore.currentAddress) || 'Not Connected' }}</span>
            <div class="border-1 rounded-sm flex justify-center items-center px-2 gap-1 cursor-pointer leading-3 text-[10px] border-black">
              EVM
              <img src="../../assets/page/switch.svg" />
            </div>
          </div>
        </div>
        <RouterLink v-if="walletStore.currentAddress"
          class="float-right text-sm cursor-pointert link link-primary no-underline font-medium"
          :to="`/${chain}/account/${walletStore.currentAddress}`">{{ $t('index.more') }}</RouterLink>
      </div>
      <div class="grid grid-cols-1 md:!grid-cols-4 auto-cols-auto gap-4 px-4 pb-6 mt-3">
        <div class="bg-gray-100 dark:bg-[#373f59] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('account.balance') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.balanceOfStakingToken) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.balanceOfStakingToken) }}
          </div>
        </div>
        <div class="bg-gray-100 dark:bg-[#373f59] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('module.staking') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.stakingAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.stakingAmount) }}
          </div>
        </div>
        <div class="bg-gray-100 dark:bg-[#373f59] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('index.reward') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.rewardAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.rewardAmount) }}
          </div>
        </div>
        <div class="bg-gray-100 dark:bg-[#373f59] rounded-sm px-4 py-3">
          <div class="text-sm mb-1">{{ $t('index.unbonding') }}</div>
          <div class="text-lg font-semibold text-main">
            {{ format.formatToken(walletStore.unbondingAmount) }}
          </div>
          <div class="text-sm" :class="color">
            ${{ format.tokenValue(walletStore.unbondingAmount) }}
          </div>
        </div>
      </div>

    </div>

    <div v-if="walletStore.delegations.length > 0" class="px-4 pb-4 overflow-auto">
      <table class="table table-compact w-full table-zebra">
        <thead>
          <tr>
            <th>{{ $t('account.validator') }}</th>
            <th>{{ $t('account.delegations') }}</th>
            <th>{{ $t('account.rewards') }}</th>
            <th>{{ $t('staking.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in walletStore.delegations" :key="index">
            <td>
              <RouterLink class="link link-primary no-underline"
                :to="`/${chain}/staking/${item?.delegation?.validator_address}`">
                {{
                  format.validatorFromBech32(
                    item?.delegation?.validator_address
                  )
                }}
              </RouterLink>
            </td>
            <td>{{ format.formatToken(item?.balance) }}</td>
            <td>
              {{
                format.formatTokens(
                  walletStore?.rewards?.rewards?.find(
                    (el) =>
                      el?.validator_address ===
                      item?.delegation?.validator_address
                  )?.reward)
              }}
            </td>
            <td>
              <div>
                <label for="delegate" class="btn !btn-xs !btn-primary btn-ghost rounded-sm mr-2"
                  @click="dialog.open('delegate', { validator_address: item.delegation.validator_address }, updateState)">
                  {{ $t('account.btn_delegate') }}
                </label>
                <label for="withdraw" class="btn !btn-xs !btn-primary btn-ghost rounded-sm mr-2"
                  @click="dialog.open('withdraw', { validator_address: item.delegation.validator_address }, updateState)">
                  {{ $t('index.btn_withdraw_reward') }}
                </label>
                <label for="unbond" class="btn !btn-xs !btn-primary btn-ghost rounded-sm mr-2"
                  @click="dialog.open('unbond', { validator_address: item.delegation.validator_address }, updateState)">
                  {{ $t('account.btn_unbond') }}
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      i18n: 'dashboard',
      order: 5,
      icon: 'wallet.svg'
    }
  }
</route>
