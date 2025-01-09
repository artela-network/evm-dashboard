<script lang="ts" setup>
import { useGovStore } from '@/stores';
import ProposalListItem from '@/components/ProposalListItem.vue';
import { ref, onMounted } from 'vue';
import PaginationBar from '@/components/PaginationBar.vue';
import { PageRequest } from '@/types';

const tab = ref('2');
const store = useGovStore();
const pageRequest = ref(new PageRequest())

onMounted(() => {
    store.fetchProposals('2').then((x) => {
        if (x?.proposals?.length === 0) {
            tab.value = '3';
            store.fetchProposals('3');
        }
        store.fetchProposals('3');
        store.fetchProposals('4');
    });
});

const changeTab = (val: '2' | '3' | '4') => {
    tab.value = val;
};

function page(p: number) {
    pageRequest.value.setPage(p)
    store.fetchProposals(tab.value, pageRequest.value)
}

const openLink = () => {
    window.open('https://docs.artela.network/develop/validate/ReferenceD', '_blank');
}
</script>
<template>
    <div>
        <div class="flex gap-4 bg-base-100 rounded mt-4 shadow py-5 px-6">
            <div class="w-[100px] flex-shrink-0">
                <img src="../../../assets/page/gov.png" />
            </div>
            <div class="flex flex-col gap-2 justify-around py-5">
                <div class="text-xl font-medium">
                    Vote for Proposals You Support and Participate in Artela's Governance
                </div>
                <div class="text-sm">
                    At Artela, everyone has the opportunity to participate in on-chain governance. By staking, you earn
                    voting rights. Use your voting power to vote for the proposals you believe in and contribute to a
                    stronger, more secure blockchain ecosystem.
                </div>
            </div>
            <div class="text-[#0000c9] cursor-pointer"
                @click="openLink"
            >
                More
            </div>
        </div>
        <div class="flex items-center justify-between py-1 bg-[#E6F4FF] px-3 mt-4">
            <div class="tabs tabs-boxed bg-transparent">
                <a class="tab text-gray-400 uppercase" :class="{ 'bg-[#0000C9] text-white': tab === '2' }" @click="changeTab('2')">{{
                    $t('gov.voting') }}</a>
                <a class="tab text-gray-400 uppercase" :class="{ 'bg-[#0000C9] text-white': tab === '3' }" @click="changeTab('3')">{{
                    $t('gov.passed') }}</a>
                <a class="tab text-gray-400 uppercase" :class="{ 'bg-[#0000C9] text-white': tab === '4' }" @click="changeTab('4')">{{
                    $t('gov.rejected') }}</a>
            </div>

        </div>
        <ProposalListItem :proposals="store?.proposals[tab]" />
        <PaginationBar :total="store?.proposals[tab]?.pagination?.total" :limit="pageRequest.limit" :callback="page" />
    </div>
</template>
<route>
    {
      meta: {
        i18n: 'governance',
        order: 3,
        icon: 'gov.svg'
      }
    }
  </route>
