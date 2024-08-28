<script lang="ts" setup>
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
  <div class="flex flex-col gap-4">
    <div class="flex bg-white px-6 py-8">
      <div class="flex flex-col gap-4 justify-around">
        <div>
          <div class="text-[28px] font-medium">
            Stake ART. Earn Rewards. Governance Artela
          </div>
          <div class="text-sm">
            Artela 网络采取 POS 共识机制，用户可以通过为节点验证者质押 ART，获得最高年化 7.2% 的链上奖励，并可参与治理 Artela
          </div>
        </div>
        <div class="flex">
          <label v-if="!walletStore?.currentAddress" for="PingConnectWallet"
            class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
            <span class="ml-1 block">Connect Wallet</span>
          </label>
        </div>

      </div>
      <div class="w-[383px]">
        <img src="../../../assets//home/home.png" />
      </div>
    </div>
    <div class="flex bg-white flex-col px-6 py-8">
      <div>
        <div class="text-[32px] font-medium">
          参与 Artela 治理
        </div>
        <div class="text-sm">
          Aetela 链上的产块验证由验证者进行，用户可通过为验证者质押 ART 获得链上出块奖励，同时还可以获得投票权。投票权用于为链上提案进行投票，参与 Artela 的链上治理。
        </div>
      </div>

      <div class="flex gap-2 ">
        <div class="px-4 py-6 flex gap-2 justify-between w-full">
          <div class="flex flex-row gap-3 px-6 py-8 bg-[#F5FBFF]">
            <div class="flex flex-col gap-3">
              <div class="text-2xl font-medium">Staking</div>
              <div class="">投入资产参与Artela的治理，最高可获得7.2%的收益</div>
              <RouterLink to="/Artela/staking" class="flex items-center mt-4">
                <div class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
                  Click Here
                </div>
              </RouterLink>
            </div>
            <div class="w-[150px]">
              <img src="../../../assets//home/staking.png" />
            </div>
          </div>
          <div class="bg-[#F5FBFF] flex flex-row px-6 py-8 gap-3">
            <div class="flex flex-col gap-3">
              <div class="text-2xl font-medium">Governance</div>
              <div>投入资产参与Artela的治理，最高可获得7.2%的收益</div>
              <RouterLink to="/Artela/gov" class="flex items-center mt-4">
                <div class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
                  Click Here
                </div>
              </RouterLink>
            </div>

            <div class="w-[150px]">
              <img src="../../../assets//home/gov.png" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<route>
  {
    meta: {
      i18n: 'artela',
      order: 1,
      icon: 'art.svg'
    }
  }
</route>
