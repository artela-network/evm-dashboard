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

</script>
<template>
    <div>
        <div class="flex gap-4 bg-base-100 rounded mt-4 shadow py-5 px-6">
            <div class="w-[100px]">
                <img src="../../../assets/page/gov.png" />
            </div>
            <div class="flex flex-col gap-2 justify-around py-5">
                <div class="text-xl font-medium">
                    Review proposals and vote
                </div>
                <div class="text-sm">
                    在 Artela ，人人均可参与链上治理。当你参与质押后，便会获得投票权。使用你的投票权，为你认同的提案投票吧！
                </div>
            </div>
        </div>
        <div class="tabs bg-[#E6F4FF] text-center mt-4">
            <a class="tab text-gray-400 uppercase" :class="{ 'tab-active': tab === '2' }" @click="changeTab('2')">{{
                $t('gov.voting') }}</a>
            <a class="tab text-gray-400 uppercase" :class="{ 'tab-active': tab === '3' }" @click="changeTab('3')">{{
                $t('gov.passed') }}</a>
            <a class="tab text-gray-400 uppercase" :class="{ 'tab-active': tab === '4' }" @click="changeTab('4')">{{
                $t('gov.rejected') }}</a>
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
