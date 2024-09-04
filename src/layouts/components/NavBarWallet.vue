<script setup lang="ts">
import { useBaseStore, useBlockchain, useWalletStore } from '@/stores';
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import { bech32 } from 'bech32';

const walletStore = useWalletStore();
const chainStore = useBlockchain();
const baseStore = useBaseStore();
// walletStore.$subscribe((m, s) => {
//   console.log(m, s);
// });
function walletStateChange(res: any) {
  walletStore.setConnectedWallet(res.detail?.value);
}
let showCopyToast = ref(0);
async function copyAdress(address: string) {
  try {
    await navigator.clipboard.writeText(address);
    showCopyToast.value = 1;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  } catch (err) {
    showCopyToast.value = 2;
    setTimeout(() => {
      showCopyToast.value = 0;
    }, 1000);
  }
}
const tipMsg = computed(() => {
  return showCopyToast.value === 2
    ? { class: 'error', msg: 'Copy Error!' }
    : { class: 'success', msg: 'Copy Success!' };
});


const isEvmFormat = ref(true);
// Computed property to determine the button text
const addressFormat = computed(() => (isEvmFormat.value ? 'EVM' : 'Cosmos'));

// Method to toggle the address format
const toggleAddressFormat = () => {
  isEvmFormat.value = !isEvmFormat.value;
};

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
const currentAddress2 = () => {
  return isEvmFormat.value
    ? cosmosToEvmAddress(walletStore.currentAddress)
    : walletStore.currentAddress;
}

</script>

<template>
  <div class="dropdown dropdown-hover dropdown-end">
    <img src="../../assets/header/wallet.svg" />

    <div tabindex="0" class="dropdown-content menu shadow p-2 bg-base-100 rounded w-52 md:!w-64">
      <label v-if="!walletStore?.currentAddress" for="PingConnectWallet" class="btn btn-sm btn-primary">
        <Icon icon="mdi:wallet" /><span class="ml-1 block">Connect Wallet</span>
      </label>
      <div class="px-2 mb-1 text-gray-500 dark:text-gray-400 font-semibold">
        {{ walletStore.connectedWallet?.wallet }}
      </div>
      <div>
        <a v-if="walletStore.currentAddress"
          class="block py-2 px-2 hover:bg-gray-100 dark:hover:bg-[#353f5a] rounded cursor-pointer"
          style="overflow-wrap: anywhere" @click="copyAdress(currentAddress2())">
          {{ currentAddress2() }}
        </a>
        <div class="flex gap-2 items-center" v-if="walletStore.currentAddress">
          <div
            class="border-1 py-1 ml-2 rounded-sm flex justify-center items-center px-2 gap-1 cursor-pointer leading-3 text-[12px] border-black"
            @click="toggleAddressFormat">
            {{ addressFormat }}
            <img src="../../assets/page/switch.svg" />
          </div>
          <button class="tooltip" data-tip="At Artela, everyone has the opportunity to participate in on-chain governance. By staking, you earn voting rights. Use your voting power to vote for the proposals you believe in and contribute to a stronger, more secure blockchain ecosystem.">
            <img src="../../assets/tip.svg" />
          </button>
        </div>
        <div v-if="walletStore.currentAddress" class="divider mt-1 mb-1"></div>
        <a v-if="walletStore.currentAddress"
          class="block py-2 px-2 hover:bg-gray-100 text-[#ED4E00] dark:hover:bg-[#353f5a] rounded cursor-pointer"
          @click="walletStore.disconnect()">Disconnect</a>
      </div>
    </div>
    <div class="toast" v-show="showCopyToast === 1">
      <div class="alert alert-success">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
    <div class="toast" v-show="showCopyToast === 2">
      <div class="alert alert-error">
        <div class="text-xs md:!text-sm">
          <span>{{ tipMsg.msg }}</span>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <ping-connect-wallet :chain-id="baseStore.currentChainId" :hd-path="chainStore.defaultHDPath"
      :addr-prefix="chainStore.current?.bech32Prefix || 'cosmos'" @connect="walletStateChange"
      @keplr-config="walletStore.suggestChain()" />
  </Teleport>
</template>

<style>
.ping-connect-btn,
.ping-connect-dropdown {
  display: none !important;
}
</style>
