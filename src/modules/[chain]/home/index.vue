<script lang="ts" setup>
import { useBaseStore, useBlockchain, useWalletStore } from '@/stores';
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import { bech32 } from 'bech32';

const walletStore = useWalletStore();
const chainStore = useBlockchain();
const baseStore = useBaseStore();

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
const addressFormat = computed(() => (isEvmFormat.value ? 'EVM' : 'Cosmos'));

const toggleAddressFormat = () => {
  isEvmFormat.value = !isEvmFormat.value;
};

function cosmosToEvmAddress(cosmosAddress: string): string {
  if (!cosmosAddress) {
    return ''
  }

  const decoded = bech32.decode(cosmosAddress);
  const pubkeyHash = new Uint8Array(bech32.fromWords(decoded.words));

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
const copyCurrentAddress2 = async () => {
  try {
    await navigator.clipboard.writeText(currentAddress2());
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

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col md:!flex-row bg-white px-4 md:!px-6 py-6 md:!py-8">
      <div class="flex flex-col gap-4 justify-around">
        <div class="flex flex-col gap-3">
          <div class="text-2xl md:!text-[28px] font-medium leading-8">
            Stake ART on Artela to Earn Rewards and Participate in Governance
          </div>
          <div class="text-sm">
            The Artela network hosts numerous node validators, allowing users to stake ART with these validators to earn
            on-chain rewards. By staking, users also gain voting rights, enabling them to vote on on-chain proposals and
            actively participate in the governance of Artela.
          </div>
        </div>
        <div class="flex">
          <label v-if="!walletStore?.currentAddress" for="PingConnectWallet"
            class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
            <span class="ml-1 block">Connect Wallet</span>
          </label>
          <div class="flex flex-col gap-3" v-else>
            <div class="text-xl font-medium">
              Current Address
            </div>
            <div class="flex flex-col md:!flex-row w-full gap-1">
              <span class="text-[#000014B2] truncate text-xs sm:text-base underline underline-offset-1">
                {{ currentAddress2() || 'Not Connected' }}
              </span>
              <div class="flex items-center mt-2 md:!mt-0">
                <div
                  class="border-1 ml-0 md:!ml-2 rounded-sm flex justify-center items-center px-2 py-1 gap-1 cursor-pointer leading-3 text-[12px] border-black relative"
                  @click="copyCurrentAddress2">
                  Copy
                  <img src="../../../assets/copy.svg" alt="Copy" class="w-3 h-3" />
                  <span v-if="showCopyToast === 1" class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                    Copied!
                  </span>
                  <span v-if="showCopyToast === 2" class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs py-1 px-2 rounded">
                    Copy failed
                  </span>
                </div>
                <div
                  class="border-1 ml-0 md:!ml-2 rounded-sm flex justify-center items-center px-2 py-1 gap-1 cursor-pointer leading-3 text-[12px] border-black"
                  @click="toggleAddressFormat">
                  {{ addressFormat }}
                  <img src="../../../assets/page/switch.svg" />
                </div>
                <button class="tooltip ml-2"
                  data-tip="Artela's native address is in EVM format, but when participating in on-chain governance, your address will automatically convert to Cosmos format. You can freely switch the display format of your address here. Note: During on-chain governance, all addresses in transactions will be shown in Cosmos format.">
                  <img src="../../../assets/tip.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:!w-[383px] flex-shrink-0 mt-4 md:!mt-0">
        <img src="../../../assets//home/home.png" class="w-full h-auto" />
      </div>
    </div>
    <div class="flex bg-white flex-col px-4 md:!px-6 py-6 md:!py-8">
      <div>
        <div class="text-2xl md:!text-[32px] font-medium">
          Participate in Governance
        </div>
        <div class="text-sm">
          Earn staking rewards and voting rights
        </div>
      </div>

      <div class="flex flex-col md:!flex-row gap-4 mt-4">
        <div class="flex-1 flex flex-col md:!flex-row gap-3 px-4 md:!px-6 py-6 md:!py-8 bg-[#F5FBFF]">
          <div class="flex flex-col gap-3">
            <div class="text-2xl font-medium">Staking</div>
            <div class="">
              Stake ART to earn up to 7.2% annual yield and gain voting rights. Use your voting rights to vote on the
              on-chain proposals you support.
            </div>
            <RouterLink to="/Artela/staking" class="flex items-center mt-4">
              <div class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
                Click Here
              </div>
            </RouterLink>
          </div>
          <div class="w-full md:!w-[150px] mt-4 md:!mt-0">
            <img src="../../../assets//home/staking.png" class="w-full h-auto" />
          </div>
        </div>
        <div class="flex-1 bg-[#F5FBFF] flex flex-col md:!flex-row px-4 md:!px-6 py-6 md:!py-8 gap-3">
          <div class="flex flex-col gap-3">
            <div class="text-2xl font-medium">Governance</div>
            <div>
              Vote on the on-chain proposals you support and actively participate in the governance of Artela.
            </div>
            <RouterLink to="/Artela/gov" class="flex items-center mt-4">
              <div class="border-[#000014] py-3 px-6 border-1 cursor-pointer">
                Click Here
              </div>
            </RouterLink>
          </div>
          <div class="w-full md:!w-[150px] mt-4 md:!mt-0">
            <img src="../../../assets//home/gov.png" class="w-full h-auto" />
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
