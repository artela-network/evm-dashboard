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
                        The First Staking++Deposit Returns 5% ART
                    </h3>
                    <p class="text-sm text-[#1B1B2B]/60 sm:text-base">
                        From now until 00:00:00 UTC on November 20, 2024, users will receive a 5% ART return on their first staking, provided the staking period exceeds 7 days. Rewards will be distributed by December 1, 2024. Don’t miss out—join now!
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
