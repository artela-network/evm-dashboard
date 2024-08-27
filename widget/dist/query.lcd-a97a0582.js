import { _ as n, s as e } from "./main-0185a46e.js";
class l {
  constructor({
    requestClient: i
  }) {
    n(this, "req", void 0), this.req = i, this.pools = this.pools.bind(this), this.params = this.params.bind(this), this.userPositions = this.userPositions.bind(this), this.totalLiquidityForRange = this.totalLiquidityForRange.bind(this), this.liquidityNetInDirection = this.liquidityNetInDirection.bind(this), this.claimableFees = this.claimableFees.bind(this), this.positionById = this.positionById.bind(this);
  }
  /* Pools returns all concentrated liquidity pools */
  async pools(i = {
    pagination: void 0
  }) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.pagination) < "u" && e(t, i.pagination);
    const o = "osmosis/concentratedliquidity/v1beta1/pools";
    return await this.req.get(o, t);
  }
  /* Params returns concentrated liquidity module params. */
  async params(i = {}) {
    const t = "osmosis/concentratedliquidity/v1beta1/params";
    return await this.req.get(t);
  }
  /* UserPositions returns all concentrated postitions of some address. */
  async userPositions(i) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.poolId) < "u" && (t.params.pool_id = i.poolId);
    const o = `osmosis/concentratedliquidity/v1beta1/positions/${i.address}`;
    return await this.req.get(o, t);
  }
  /* TotalLiquidityForRange the amount of liquidity existing within given range. */
  async totalLiquidityForRange(i) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.poolId) < "u" && (t.params.pool_id = i.poolId);
    const o = "osmosis/concentratedliquidity/v1beta1/total_liquidity_for_range";
    return await this.req.get(o, t);
  }
  /* LiquidityNetInDirection returns liquidity net in the direction given.
   Uses the bound if specified, if not uses either min tick / max tick
   depending on the direction. */
  async liquidityNetInDirection(i) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.poolId) < "u" && (t.params.pool_id = i.poolId), typeof (i == null ? void 0 : i.tokenIn) < "u" && (t.params.token_in = i.tokenIn), typeof (i == null ? void 0 : i.startTick) < "u" && (t.params.start_tick = i.startTick), typeof (i == null ? void 0 : i.boundTick) < "u" && (t.params.bound_tick = i.boundTick);
    const o = "osmosis/concentratedliquidity/v1beta1/query_liquidity_net_in_direction";
    return await this.req.get(o, t);
  }
  /* ClaimableFees returns the amount of fees that can be claimed by a position
   with the given id. */
  async claimableFees(i) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.positionId) < "u" && (t.params.position_id = i.positionId);
    const o = "osmosis/concentratedliquidity/v1beta1/claimable_fees";
    return await this.req.get(o, t);
  }
  /* PositionById returns a position with the given id. */
  async positionById(i) {
    const t = {
      params: {}
    };
    typeof (i == null ? void 0 : i.positionId) < "u" && (t.params.position_id = i.positionId);
    const o = "osmosis/concentratedliquidity/v1beta1/position_by_id";
    return await this.req.get(o, t);
  }
}
export {
  l as LCDQueryClient
};
