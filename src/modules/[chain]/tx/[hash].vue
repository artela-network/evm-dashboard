<script lang="ts" setup>
import { useBaseStore, useBlockchain, useFormatter } from '@/stores';
import DynamicComponent from '@/components/dynamic/DynamicComponent.vue';
import { computed, ref, watch } from 'vue';
import type { Tx, TxResponse } from '@/types';

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const props = defineProps(['hash', 'chain']);

const blockchain = useBlockchain();
const baseStore = useBaseStore();
const format = useFormatter();
const tx = ref(
    {} as {
        tx: Tx;
        tx_response: TxResponse;
    }
);
if (props.hash) {
    blockchain.rpc.getTx(props.hash).then((x) => (tx.value = x));
}
const messages = computed(() => {
    return tx.value.tx?.body?.messages.map(x=> {
        if(x.packet?.data) {
            // @ts-ignore
            x.message = format.base64ToString(x.packet.data)
        }
        return x
    }) || [];
});

const jsonTheme = computed(() => {
    return baseStore.theme === 'dark' ? 'dark' : 'light';
});

const copyJsonToClipboard = () => {
    const jsonString = JSON.stringify(tx.value, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
        alert('JSON copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy JSON: ', err);
    });
};
</script>
<template>
    <div>
        <div class="tabs tabs-boxed bg-transparent mb-4">
            <RouterLink class="tab text-gray-400 uppercase" 
                :to="`/${chain}/tx/?tab=recent`"
                >{{ $t('block.recent') }}</RouterLink>
            <RouterLink class="tab text-gray-400 uppercase" 
                :to="`/${chain}/tx/?tab=search`"
                >Search</RouterLink>
            <a class="tab text-gray-400 uppercase tab-active">Transaction</a>
        </div>

        <div v-if="tx.tx_response" class="bg-base-100 px-4 pt-3 pb-4 rounded shadow mb-4">
            <h2 class="card-title truncate mb-2">{{ $t('tx.title') }}</h2>
            <div class="overflow-hidden">
                <table class="table text-sm">
                    <tbody>
                        <tr>
                            <td>{{ $t('tx.tx_hash') }}</td>
                            <td class="overflow-hidden">{{ tx.tx_response.txhash }}</td>
                        </tr>
                        <tr>
                            <td>{{ $t('account.height') }}</td>
                            <td>
                                <RouterLink :to="`/${props.chain}/block/${tx.tx_response.height}`" class="text-primary dark:invert">{{ tx.tx_response.height
                                }}
                                </RouterLink>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ $t('staking.status') }}</td>
                            <td>
                                <span class="text-xs truncate relative py-2 px-4 w-fit mr-2 rounded" :class="`text-${tx.tx_response.code === 0 ? 'success' : 'error'
                                    }`">
                                    <span class="inset-x-0 inset-y-0 opacity-10 absolute" :class="`bg-${tx.tx_response.code === 0 ? 'success' : 'error'
                                        }`"></span>
                                    {{ tx.tx_response.code === 0 ? 'Success' : 'Failed' }}
                                </span>
                                <span>
                                    {{ tx.tx_response.code === 0 ? '' : tx?.tx_response?.raw_log }}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ $t('account.time') }}</td>
                            <td>
                                {{ format.toLocaleDate(tx.tx_response.timestamp) }} ({{
                                    format.toDay(tx.tx_response.timestamp, 'from')
                                }})
                            </td>
                        </tr>
                        <tr>
                            <td>{{ $t('tx.gas') }}</td>
                            <td>
                                {{ tx.tx_response.gas_used }} / {{ tx.tx_response.gas_wanted }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ $t('tx.fee') }}</td>
                            <td>
                                {{
                                    format.formatTokens(
                                        tx.tx?.auth_info?.fee?.amount,
                                        true,
                                        '0,0.[00]'
                                    )
                                }}
                            </td>
                        </tr>
                        <tr>
                            <td>{{ $t('tx.memo') }}</td>
                            <td>{{ tx.tx.body.memo }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="tx.tx_response" class="bg-base-100 px-4 pt-3 pb-4 rounded shadow mb-4">
            <h2 class="card-title truncate mb-2">
                {{ $t('account.messages') }}: ({{ messages.length }})
            </h2>
            <div v-for="(msg, i) in messages">
                <div class="border border-slate-400 rounded-md mt-4">
                    <DynamicComponent :value="msg" />
                </div>
            </div>
            <div v-if="messages.length === 0">{{ $t('tx.no_messages') }}</div>
        </div>
        <div v-if="tx.tx_response" class="bg-base-100 px-4 pt-3 pb-4 rounded shadow">
            <div class="flex justify-between items-center mb-2">
                <h2 class="card-title truncate">JSON</h2>
                <button @click="copyJsonToClipboard" class="btn btn-sm btn-primary">Copy JSON</button>
            </div>
            <div class="json-viewer-container" style="max-height: 500px; overflow-y: auto;">
                <VueJsonPretty
                    :data="tx"
                    :deep="1"
                    :show-double-quotes="true"
                    :show-length="true"
                    :show-line="true"
                    :theme="jsonTheme"
                />
            </div>
        </div>
    </div>
</template>
