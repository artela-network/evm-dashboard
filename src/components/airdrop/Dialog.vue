<script setup lang="ts">
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const props = defineProps<Props>();

const handleClick = () => {
    props.onClose();
};
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-[199] flex items-center justify-center bg-black/75">
        <div class="relative mx-4 w-[311px] rounded-2xl bg-white p-6 sm:w-[602px] sm:p-8 top-9">
            <div class="absolute -top-20 left-1/2 w-full -translate-x-1/2 sm:-top-32">
                <img src="@/assets/home/bg3.png" alt="bg" class="w-full" />
            </div>

            <div
                class="relative z-10 flex w-full flex-col items-center justify-center gap-6 pt-16 sm:w-[522px] sm:pt-36">
                <!-- <div class="flex h-[55px] w-[56px] items-center justify-center">
          <img
            src="@/assets/home/airdrop/logo2.svg"
            alt="logo"
            class="h-full w-full"
          />
        </div> -->

                <div class="flex  flex-col items-center gap-3 text-center">
                    <h3 class="text-xl font-bold text-[#1B1B2B] sm:text-2xl">
                        The First Staking++Deposit Returns 310.8% $ART
                    </h3>
                    <p class="text-sm text-[#1B1B2B]/60 sm:text-base">
                        😄Jumpstart your Artela journey with our Staking++ event! Earn an impressive 310.8% annualized yield on your first stake held for exactly 5 days. This exciting opportunity rewards early participants while fostering deeper community engagement and long-term commitment to the Artela Network ecosystem.
                        <a href="https://artela.notion.site/About-Artela-Staking-First-Stake-Bonus-310-8-APY-Reward-17cdb9fb849080959662d4e37b852b65?pvs=74" target="_blank" class="text-[#ED4E00] hover:underline">learn more</a>
                    </p>
                </div>

                <button @click="handleClick"
                    class="w-full rounded-sm bg-[#ED4E00] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#Ef4e00] sm:w-[357px] sm:py-4 sm:text-base">
                    Go Now
                </button>
            </div>
        </div>
    </div>
</template>
