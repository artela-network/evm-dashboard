import { defineStore } from 'pinia';
import { useBlockchain } from './useBlockchain';
import { percent } from '@/libs/utils';
import { CosmosRestClient } from '@/libs/client';

interface BlockchainStore {
  rest: string;
  rpc: CosmosRestClient;
}

interface BankSupplyResponse {
  supply: { denom: string; amount: string }[];
}

interface StakingPoolResponse {
  pool: {
    bonded_tokens: string;
    not_bonded_tokens: string;
  };
}

interface InflationResponse {
  inflation: string;
}

export const useApyStore = defineStore('apystore', {
  state: () => ({
    latestUpdate: '',
    currentApy: '-'
  }),

  getters: {
    blockchain(): BlockchainStore {
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