import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import { percent } from '@/libs/utils';

export const useApyStore = defineStore('apystore', {
  state: () => ({
    latestUpdate: '',
    currentApy: '-'
  }),

  getters: {
    blockchain() {
      return useBlockchain();
    },
  },

  actions: {
    async fetchCurrentApy() {
      try {
        const [supplyRes, poolRes, inflationRes] = await Promise.all([
          this.blockchain.rpc?.getBankSupply(),
          this.blockchain.rpc?.getStakingPool(),
          this.blockchain.rpc?.getMintInflation()
        ]);
        console.log(supplyRes, poolRes, inflationRes, '==--==');
        // 计算 APY
        const totalSupply = supplyRes.supply[0].amount;
        const bondedTokens = poolRes.pool.bonded_tokens;
        const inflation = inflationRes.inflation;
        const commissionRate = 0.1;
        const yearStakeTotal = Number(totalSupply) *  Number(inflation) * (1 - Number(commissionRate));
        const apy = yearStakeTotal / Number(bondedTokens);
        
        this.currentApy = `${percent(apy)}%`;
        this.latestUpdate = new Date().toISOString();
      } catch (error) {
        console.warn('Error fetching APY:', error);
      }
    },
  },
}); 