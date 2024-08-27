import { C as u, m as r, T as W, t as ee, f as ie, L as d, P as L, A as p, a as B, b as F, c as w, d as M, e as U, g as Q, h as oe, _ as ne } from "./main-0185a46e.js";
function Z() {
  return {
    positionId: d.UZERO,
    address: "",
    poolId: d.UZERO,
    lowerTick: d.ZERO,
    upperTick: d.ZERO,
    joinTime: void 0,
    liquidity: ""
  };
}
const l = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.Position",
  encode(e, i = r.Writer.create()) {
    return e.positionId.isZero() || i.uint32(8).uint64(e.positionId), e.address !== "" && i.uint32(18).string(e.address), e.poolId.isZero() || i.uint32(24).uint64(e.poolId), e.lowerTick.isZero() || i.uint32(32).int64(e.lowerTick), e.upperTick.isZero() || i.uint32(40).int64(e.upperTick), e.joinTime !== void 0 && W.encode(ee(e.joinTime), i.uint32(50).fork()).ldelim(), e.liquidity !== "" && i.uint32(58).string(e.liquidity), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = Z();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.positionId = o.uint64();
          break;
        case 2:
          n.address = o.string();
          break;
        case 3:
          n.poolId = o.uint64();
          break;
        case 4:
          n.lowerTick = o.int64();
          break;
        case 5:
          n.upperTick = o.int64();
          break;
        case 6:
          n.joinTime = ie(W.decode(o, o.uint32()));
          break;
        case 7:
          n.liquidity = o.string();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i, o, t;
    const n = Z();
    return n.positionId = e.positionId !== void 0 && e.positionId !== null ? d.fromValue(e.positionId) : d.UZERO, n.address = (i = e.address) !== null && i !== void 0 ? i : "", n.poolId = e.poolId !== void 0 && e.poolId !== null ? d.fromValue(e.poolId) : d.UZERO, n.lowerTick = e.lowerTick !== void 0 && e.lowerTick !== null ? d.fromValue(e.lowerTick) : d.ZERO, n.upperTick = e.upperTick !== void 0 && e.upperTick !== null ? d.fromValue(e.upperTick) : d.ZERO, n.joinTime = (o = e.joinTime) !== null && o !== void 0 ? o : void 0, n.liquidity = (t = e.liquidity) !== null && t !== void 0 ? t : "", n;
  },
  fromAmino(e) {
    return {
      positionId: d.fromString(e.position_id),
      address: e.address,
      poolId: d.fromString(e.pool_id),
      lowerTick: d.fromString(e.lower_tick),
      upperTick: d.fromString(e.upper_tick),
      joinTime: e != null && e.join_time ? W.fromAmino(e.join_time) : void 0,
      liquidity: e.liquidity
    };
  },
  toAmino(e) {
    const i = {};
    return i.position_id = e.positionId ? e.positionId.toString() : void 0, i.address = e.address, i.pool_id = e.poolId ? e.poolId.toString() : void 0, i.lower_tick = e.lowerTick ? e.lowerTick.toString() : void 0, i.upper_tick = e.upperTick ? e.upperTick.toString() : void 0, i.join_time = e.joinTime ? W.toAmino(e.joinTime) : void 0, i.liquidity = e.liquidity, i;
  },
  fromAminoMsg(e) {
    return l.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/position",
      value: l.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return l.decode(e.value);
  },
  toProto(e) {
    return l.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.Position",
      value: l.encode(e).finish()
    };
  }
};
function D() {
  return {
    position: void 0,
    asset0: void 0,
    asset1: void 0
  };
}
const a = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.PositionWithUnderlyingAssetBreakdown",
  encode(e, i = r.Writer.create()) {
    return e.position !== void 0 && l.encode(e.position, i.uint32(10).fork()).ldelim(), e.asset0 !== void 0 && u.encode(e.asset0, i.uint32(18).fork()).ldelim(), e.asset1 !== void 0 && u.encode(e.asset1, i.uint32(26).fork()).ldelim(), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = D();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.position = l.decode(o, o.uint32());
          break;
        case 2:
          n.asset0 = u.decode(o, o.uint32());
          break;
        case 3:
          n.asset1 = u.decode(o, o.uint32());
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = D();
    return i.position = e.position !== void 0 && e.position !== null ? l.fromPartial(e.position) : void 0, i.asset0 = e.asset0 !== void 0 && e.asset0 !== null ? u.fromPartial(e.asset0) : void 0, i.asset1 = e.asset1 !== void 0 && e.asset1 !== null ? u.fromPartial(e.asset1) : void 0, i;
  },
  fromAmino(e) {
    return {
      position: e != null && e.position ? l.fromAmino(e.position) : void 0,
      asset0: e != null && e.asset0 ? u.fromAmino(e.asset0) : void 0,
      asset1: e != null && e.asset1 ? u.fromAmino(e.asset1) : void 0
    };
  },
  toAmino(e) {
    const i = {};
    return i.position = e.position ? l.toAmino(e.position) : void 0, i.asset0 = e.asset0 ? u.toAmino(e.asset0) : void 0, i.asset1 = e.asset1 ? u.toAmino(e.asset1) : void 0, i;
  },
  fromAminoMsg(e) {
    return a.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/position-with-underlying-asset-breakdown",
      value: a.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return a.decode(e.value);
  },
  toProto(e) {
    return a.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.PositionWithUnderlyingAssetBreakdown",
      value: a.encode(e).finish()
    };
  }
};
function N() {
  return {
    address: "",
    poolId: d.UZERO
  };
}
const f = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryUserPositionsRequest",
  encode(e, i = r.Writer.create()) {
    return e.address !== "" && i.uint32(10).string(e.address), e.poolId.isZero() || i.uint32(16).uint64(e.poolId), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = N();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.address = o.string();
          break;
        case 2:
          n.poolId = o.uint64();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i;
    const o = N();
    return o.address = (i = e.address) !== null && i !== void 0 ? i : "", o.poolId = e.poolId !== void 0 && e.poolId !== null ? d.fromValue(e.poolId) : d.UZERO, o;
  },
  fromAmino(e) {
    return {
      address: e.address,
      poolId: d.fromString(e.pool_id)
    };
  },
  toAmino(e) {
    const i = {};
    return i.address = e.address, i.pool_id = e.poolId ? e.poolId.toString() : void 0, i;
  },
  fromAminoMsg(e) {
    return f.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-user-positions-request",
      value: f.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return f.decode(e.value);
  },
  toProto(e) {
    return f.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryUserPositionsRequest",
      value: f.encode(e).finish()
    };
  }
};
function S() {
  return {
    positions: []
  };
}
const y = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryUserPositionsResponse",
  encode(e, i = r.Writer.create()) {
    for (const o of e.positions)
      a.encode(o, i.uint32(10).fork()).ldelim();
    return i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = S();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.positions.push(a.decode(o, o.uint32()));
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i;
    const o = S();
    return o.positions = ((i = e.positions) === null || i === void 0 ? void 0 : i.map((t) => a.fromPartial(t))) || [], o;
  },
  fromAmino(e) {
    return {
      positions: Array.isArray(e == null ? void 0 : e.positions) ? e.positions.map((i) => a.fromAmino(i)) : []
    };
  },
  toAmino(e) {
    const i = {};
    return e.positions ? i.positions = e.positions.map((o) => o ? a.toAmino(o) : void 0) : i.positions = [], i;
  },
  fromAminoMsg(e) {
    return y.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-user-positions-response",
      value: y.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return y.decode(e.value);
  },
  toProto(e) {
    return y.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryUserPositionsResponse",
      value: y.encode(e).finish()
    };
  }
};
function E() {
  return {
    positionId: d.UZERO
  };
}
const q = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPositionByIdRequest",
  encode(e, i = r.Writer.create()) {
    return e.positionId.isZero() || i.uint32(8).uint64(e.positionId), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = E();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.positionId = o.uint64();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = E();
    return i.positionId = e.positionId !== void 0 && e.positionId !== null ? d.fromValue(e.positionId) : d.UZERO, i;
  },
  fromAmino(e) {
    return {
      positionId: d.fromString(e.position_id)
    };
  },
  toAmino(e) {
    const i = {};
    return i.position_id = e.positionId ? e.positionId.toString() : void 0, i;
  },
  fromAminoMsg(e) {
    return q.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-position-by-id-request",
      value: q.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return q.decode(e.value);
  },
  toProto(e) {
    return q.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPositionByIdRequest",
      value: q.encode(e).finish()
    };
  }
};
function O() {
  return {
    position: void 0
  };
}
const v = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPositionByIdResponse",
  encode(e, i = r.Writer.create()) {
    return e.position !== void 0 && a.encode(e.position, i.uint32(10).fork()).ldelim(), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = O();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.position = a.decode(o, o.uint32());
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = O();
    return i.position = e.position !== void 0 && e.position !== null ? a.fromPartial(e.position) : void 0, i;
  },
  fromAmino(e) {
    return {
      position: e != null && e.position ? a.fromAmino(e.position) : void 0
    };
  },
  toAmino(e) {
    const i = {};
    return i.position = e.position ? a.toAmino(e.position) : void 0, i;
  },
  fromAminoMsg(e) {
    return v.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-position-by-id-response",
      value: v.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return v.decode(e.value);
  },
  toProto(e) {
    return v.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPositionByIdResponse",
      value: v.encode(e).finish()
    };
  }
};
function $() {
  return {
    pagination: void 0
  };
}
const k = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPoolsRequest",
  encode(e, i = r.Writer.create()) {
    return e.pagination !== void 0 && L.encode(e.pagination, i.uint32(18).fork()).ldelim(), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = $();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 2:
          n.pagination = L.decode(o, o.uint32());
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = $();
    return i.pagination = e.pagination !== void 0 && e.pagination !== null ? L.fromPartial(e.pagination) : void 0, i;
  },
  fromAmino(e) {
    return {
      pagination: e != null && e.pagination ? L.fromAmino(e.pagination) : void 0
    };
  },
  toAmino(e) {
    const i = {};
    return i.pagination = e.pagination ? L.toAmino(e.pagination) : void 0, i;
  },
  fromAminoMsg(e) {
    return k.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-pools-request",
      value: k.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return k.decode(e.value);
  },
  toProto(e) {
    return k.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPoolsRequest",
      value: k.encode(e).finish()
    };
  }
};
function C() {
  return {
    pools: [],
    pagination: void 0
  };
}
const P = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPoolsResponse",
  encode(e, i = r.Writer.create()) {
    for (const o of e.pools)
      p.encode(o, i.uint32(10).fork()).ldelim();
    return e.pagination !== void 0 && B.encode(e.pagination, i.uint32(18).fork()).ldelim(), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = C();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.pools.push(te(o));
          break;
        case 2:
          n.pagination = B.decode(o, o.uint32());
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i;
    const o = C();
    return o.pools = ((i = e.pools) === null || i === void 0 ? void 0 : i.map((t) => p.fromPartial(t))) || [], o.pagination = e.pagination !== void 0 && e.pagination !== null ? B.fromPartial(e.pagination) : void 0, o;
  },
  fromAmino(e) {
    return {
      pools: Array.isArray(e == null ? void 0 : e.pools) ? e.pools.map((i) => re(i)) : [],
      pagination: e != null && e.pagination ? B.fromAmino(e.pagination) : void 0
    };
  },
  toAmino(e) {
    const i = {};
    return e.pools ? i.pools = e.pools.map((o) => o ? se(o) : void 0) : i.pools = [], i.pagination = e.pagination ? B.toAmino(e.pagination) : void 0, i;
  },
  fromAminoMsg(e) {
    return P.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-pools-response",
      value: P.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return P.decode(e.value);
  },
  toProto(e) {
    return P.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryPoolsResponse",
      value: P.encode(e).finish()
    };
  }
};
function x() {
  return {};
}
const A = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryParamsRequest",
  encode(e, i = r.Writer.create()) {
    return i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = x();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    return x();
  },
  fromAmino(e) {
    return {};
  },
  toAmino(e) {
    return {};
  },
  fromAminoMsg(e) {
    return A.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-params-request",
      value: A.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return A.decode(e.value);
  },
  toProto(e) {
    return A.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryParamsRequest",
      value: A.encode(e).finish()
    };
  }
};
function V() {
  return {
    params: void 0
  };
}
const R = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryParamsResponse",
  encode(e, i = r.Writer.create()) {
    return e.params !== void 0 && F.encode(e.params, i.uint32(10).fork()).ldelim(), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = V();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.params = F.decode(o, o.uint32());
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = V();
    return i.params = e.params !== void 0 && e.params !== null ? F.fromPartial(e.params) : void 0, i;
  },
  fromAmino(e) {
    return {
      params: e != null && e.params ? F.fromAmino(e.params) : void 0
    };
  },
  toAmino(e) {
    const i = {};
    return i.params = e.params ? F.toAmino(e.params) : void 0, i;
  },
  fromAminoMsg(e) {
    return R.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-params-response",
      value: R.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return R.decode(e.value);
  },
  toProto(e) {
    return R.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryParamsResponse",
      value: R.encode(e).finish()
    };
  }
};
function z() {
  return {
    liquidityNet: "",
    tickIndex: ""
  };
}
const c = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.TickLiquidityNet",
  encode(e, i = r.Writer.create()) {
    return e.liquidityNet !== "" && i.uint32(10).string(e.liquidityNet), e.tickIndex !== "" && i.uint32(18).string(e.tickIndex), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = z();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.liquidityNet = o.string();
          break;
        case 2:
          n.tickIndex = o.string();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i, o;
    const t = z();
    return t.liquidityNet = (i = e.liquidityNet) !== null && i !== void 0 ? i : "", t.tickIndex = (o = e.tickIndex) !== null && o !== void 0 ? o : "", t;
  },
  fromAmino(e) {
    return {
      liquidityNet: e.liquidity_net,
      tickIndex: e.tick_index
    };
  },
  toAmino(e) {
    const i = {};
    return i.liquidity_net = e.liquidityNet, i.tick_index = e.tickIndex, i;
  },
  fromAminoMsg(e) {
    return c.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/tick-liquidity-net",
      value: c.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return c.decode(e.value);
  },
  toProto(e) {
    return c.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.TickLiquidityNet",
      value: c.encode(e).finish()
    };
  }
};
function G() {
  return {
    liquidityAmount: "",
    lowerTick: "",
    upperTick: ""
  };
}
const m = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.LiquidityDepthWithRange",
  encode(e, i = r.Writer.create()) {
    return e.liquidityAmount !== "" && i.uint32(10).string(e.liquidityAmount), e.lowerTick !== "" && i.uint32(18).string(e.lowerTick), e.upperTick !== "" && i.uint32(26).string(e.upperTick), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = G();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.liquidityAmount = o.string();
          break;
        case 2:
          n.lowerTick = o.string();
          break;
        case 3:
          n.upperTick = o.string();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i, o, t;
    const n = G();
    return n.liquidityAmount = (i = e.liquidityAmount) !== null && i !== void 0 ? i : "", n.lowerTick = (o = e.lowerTick) !== null && o !== void 0 ? o : "", n.upperTick = (t = e.upperTick) !== null && t !== void 0 ? t : "", n;
  },
  fromAmino(e) {
    return {
      liquidityAmount: e.liquidity_amount,
      lowerTick: e.lower_tick,
      upperTick: e.upper_tick
    };
  },
  toAmino(e) {
    const i = {};
    return i.liquidity_amount = e.liquidityAmount, i.lower_tick = e.lowerTick, i.upper_tick = e.upperTick, i;
  },
  fromAminoMsg(e) {
    return m.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/liquidity-depth-with-range",
      value: m.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return m.decode(e.value);
  },
  toProto(e) {
    return m.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.LiquidityDepthWithRange",
      value: m.encode(e).finish()
    };
  }
};
function H() {
  return {
    poolId: d.UZERO,
    tokenIn: "",
    startTick: void 0,
    boundTick: void 0
  };
}
const h = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryLiquidityNetInDirectionRequest",
  encode(e, i = r.Writer.create()) {
    return e.poolId.isZero() || i.uint32(8).uint64(e.poolId), e.tokenIn !== "" && i.uint32(18).string(e.tokenIn), e.startTick !== void 0 && i.uint32(26).string(e.startTick), e.boundTick !== void 0 && i.uint32(34).string(e.boundTick), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = H();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.poolId = o.uint64();
          break;
        case 2:
          n.tokenIn = o.string();
          break;
        case 3:
          n.startTick = o.string();
          break;
        case 4:
          n.boundTick = o.string();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i, o, t;
    const n = H();
    return n.poolId = e.poolId !== void 0 && e.poolId !== null ? d.fromValue(e.poolId) : d.UZERO, n.tokenIn = (i = e.tokenIn) !== null && i !== void 0 ? i : "", n.startTick = (o = e.startTick) !== null && o !== void 0 ? o : void 0, n.boundTick = (t = e.boundTick) !== null && t !== void 0 ? t : void 0, n;
  },
  fromAmino(e) {
    return {
      poolId: d.fromString(e.pool_id),
      tokenIn: e.token_in,
      startTick: e == null ? void 0 : e.start_tick,
      boundTick: e == null ? void 0 : e.bound_tick
    };
  },
  toAmino(e) {
    const i = {};
    return i.pool_id = e.poolId ? e.poolId.toString() : void 0, i.token_in = e.tokenIn, i.start_tick = e.startTick, i.bound_tick = e.boundTick, i;
  },
  fromAminoMsg(e) {
    return h.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-liquidity-net-in-direction-request",
      value: h.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return h.decode(e.value);
  },
  toProto(e) {
    return h.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryLiquidityNetInDirectionRequest",
      value: h.encode(e).finish()
    };
  }
};
function J() {
  return {
    liquidityDepths: [],
    currentTick: d.ZERO,
    currentLiquidity: ""
  };
}
const g = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryLiquidityNetInDirectionResponse",
  encode(e, i = r.Writer.create()) {
    for (const o of e.liquidityDepths)
      c.encode(o, i.uint32(10).fork()).ldelim();
    return e.currentTick.isZero() || i.uint32(16).int64(e.currentTick), e.currentLiquidity !== "" && i.uint32(26).string(e.currentLiquidity), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = J();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.liquidityDepths.push(c.decode(o, o.uint32()));
          break;
        case 2:
          n.currentTick = o.int64();
          break;
        case 3:
          n.currentLiquidity = o.string();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i, o;
    const t = J();
    return t.liquidityDepths = ((i = e.liquidityDepths) === null || i === void 0 ? void 0 : i.map((n) => c.fromPartial(n))) || [], t.currentTick = e.currentTick !== void 0 && e.currentTick !== null ? d.fromValue(e.currentTick) : d.ZERO, t.currentLiquidity = (o = e.currentLiquidity) !== null && o !== void 0 ? o : "", t;
  },
  fromAmino(e) {
    return {
      liquidityDepths: Array.isArray(e == null ? void 0 : e.liquidity_depths) ? e.liquidity_depths.map((i) => c.fromAmino(i)) : [],
      currentTick: d.fromString(e.current_tick),
      currentLiquidity: e.current_liquidity
    };
  },
  toAmino(e) {
    const i = {};
    return e.liquidityDepths ? i.liquidity_depths = e.liquidityDepths.map((o) => o ? c.toAmino(o) : void 0) : i.liquidity_depths = [], i.current_tick = e.currentTick ? e.currentTick.toString() : void 0, i.current_liquidity = e.currentLiquidity, i;
  },
  fromAminoMsg(e) {
    return g.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-liquidity-net-in-direction-response",
      value: g.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return g.decode(e.value);
  },
  toProto(e) {
    return g.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryLiquidityNetInDirectionResponse",
      value: g.encode(e).finish()
    };
  }
};
function K() {
  return {
    poolId: d.UZERO
  };
}
const I = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryTotalLiquidityForRangeRequest",
  encode(e, i = r.Writer.create()) {
    return e.poolId.isZero() || i.uint32(8).uint64(e.poolId), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = K();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.poolId = o.uint64();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = K();
    return i.poolId = e.poolId !== void 0 && e.poolId !== null ? d.fromValue(e.poolId) : d.UZERO, i;
  },
  fromAmino(e) {
    return {
      poolId: d.fromString(e.pool_id)
    };
  },
  toAmino(e) {
    const i = {};
    return i.pool_id = e.poolId ? e.poolId.toString() : void 0, i;
  },
  fromAminoMsg(e) {
    return I.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-total-liquidity-for-range-request",
      value: I.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return I.decode(e.value);
  },
  toProto(e) {
    return I.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryTotalLiquidityForRangeRequest",
      value: I.encode(e).finish()
    };
  }
};
function X() {
  return {
    liquidity: []
  };
}
const T = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryTotalLiquidityForRangeResponse",
  encode(e, i = r.Writer.create()) {
    for (const o of e.liquidity)
      m.encode(o, i.uint32(10).fork()).ldelim();
    return i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = X();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.liquidity.push(m.decode(o, o.uint32()));
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i;
    const o = X();
    return o.liquidity = ((i = e.liquidity) === null || i === void 0 ? void 0 : i.map((t) => m.fromPartial(t))) || [], o;
  },
  fromAmino(e) {
    return {
      liquidity: Array.isArray(e == null ? void 0 : e.liquidity) ? e.liquidity.map((i) => m.fromAmino(i)) : []
    };
  },
  toAmino(e) {
    const i = {};
    return e.liquidity ? i.liquidity = e.liquidity.map((o) => o ? m.toAmino(o) : void 0) : i.liquidity = [], i;
  },
  fromAminoMsg(e) {
    return T.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-total-liquidity-for-range-response",
      value: T.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return T.decode(e.value);
  },
  toProto(e) {
    return T.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryTotalLiquidityForRangeResponse",
      value: T.encode(e).finish()
    };
  }
};
function Y() {
  return {
    positionId: d.UZERO
  };
}
const b = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryClaimableFeesRequest",
  encode(e, i = r.Writer.create()) {
    return e.positionId.isZero() || i.uint32(8).uint64(e.positionId), i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = Y();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.positionId = o.uint64();
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    const i = Y();
    return i.positionId = e.positionId !== void 0 && e.positionId !== null ? d.fromValue(e.positionId) : d.UZERO, i;
  },
  fromAmino(e) {
    return {
      positionId: d.fromString(e.position_id)
    };
  },
  toAmino(e) {
    const i = {};
    return i.position_id = e.positionId ? e.positionId.toString() : void 0, i;
  },
  fromAminoMsg(e) {
    return b.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-claimable-fees-request",
      value: b.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return b.decode(e.value);
  },
  toProto(e) {
    return b.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryClaimableFeesRequest",
      value: b.encode(e).finish()
    };
  }
};
function j() {
  return {
    claimableFees: []
  };
}
const _ = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryClaimableFeesResponse",
  encode(e, i = r.Writer.create()) {
    for (const o of e.claimableFees)
      u.encode(o, i.uint32(10).fork()).ldelim();
    return i;
  },
  decode(e, i) {
    const o = e instanceof r.Reader ? e : new r.Reader(e);
    let t = i === void 0 ? o.len : o.pos + i;
    const n = j();
    for (; o.pos < t; ) {
      const s = o.uint32();
      switch (s >>> 3) {
        case 1:
          n.claimableFees.push(u.decode(o, o.uint32()));
          break;
        default:
          o.skipType(s & 7);
          break;
      }
    }
    return n;
  },
  fromPartial(e) {
    var i;
    const o = j();
    return o.claimableFees = ((i = e.claimableFees) === null || i === void 0 ? void 0 : i.map((t) => u.fromPartial(t))) || [], o;
  },
  fromAmino(e) {
    return {
      claimableFees: Array.isArray(e == null ? void 0 : e.claimable_fees) ? e.claimable_fees.map((i) => u.fromAmino(i)) : []
    };
  },
  toAmino(e) {
    const i = {};
    return e.claimableFees ? i.claimable_fees = e.claimableFees.map((o) => o ? u.toAmino(o) : void 0) : i.claimable_fees = [], i;
  },
  fromAminoMsg(e) {
    return _.fromAmino(e.value);
  },
  toAminoMsg(e) {
    return {
      type: "osmosis/concentratedliquidity/query-claimable-fees-response",
      value: _.toAmino(e)
    };
  },
  fromProtoMsg(e) {
    return _.decode(e.value);
  },
  toProto(e) {
    return _.encode(e).finish();
  },
  toProtoMsg(e) {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.QueryClaimableFeesResponse",
      value: _.encode(e).finish()
    };
  }
}, te = (e) => {
  const i = e instanceof r.Reader ? e : new r.Reader(e), o = p.decode(i, i.uint32());
  switch (o.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return Q.decode(o.value);
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return U.decode(o.value);
    case "/osmosis.gamm.v1beta1.Pool":
      return M.decode(o.value);
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return w.decode(o.value);
    default:
      return o;
  }
}, re = (e) => {
  switch (e.type) {
    case "osmosis/concentratedliquidity/pool":
      return p.fromPartial({
        typeUrl: "/osmosis.concentratedliquidity.v1beta1.Pool",
        value: Q.encode(Q.fromPartial(Q.fromAmino(e.value))).finish()
      });
    case "osmosis/cosmwasmpool/cosm-wasm-pool":
      return p.fromPartial({
        typeUrl: "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool",
        value: U.encode(U.fromPartial(U.fromAmino(e.value))).finish()
      });
    case "osmosis/gamm/BalancerPool":
      return p.fromPartial({
        typeUrl: "/osmosis.gamm.v1beta1.Pool",
        value: M.encode(M.fromPartial(M.fromAmino(e.value))).finish()
      });
    case "osmosis/gamm/StableswapPool":
      return p.fromPartial({
        typeUrl: "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool",
        value: w.encode(w.fromPartial(w.fromAmino(e.value))).finish()
      });
    default:
      return p.fromAmino(e);
  }
}, se = (e) => {
  switch (e.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return {
        type: "osmosis/concentratedliquidity/pool",
        value: Q.toAmino(Q.decode(e.value))
      };
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return {
        type: "osmosis/cosmwasmpool/cosm-wasm-pool",
        value: U.toAmino(U.decode(e.value))
      };
    case "/osmosis.gamm.v1beta1.Pool":
      return {
        type: "osmosis/gamm/BalancerPool",
        value: M.toAmino(M.decode(e.value))
      };
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return {
        type: "osmosis/gamm/StableswapPool",
        value: w.toAmino(w.decode(e.value))
      };
    default:
      return p.toAmino(e);
  }
};
class de {
  constructor(i) {
    ne(this, "rpc", void 0), this.rpc = i, this.pools = this.pools.bind(this), this.params = this.params.bind(this), this.userPositions = this.userPositions.bind(this), this.totalLiquidityForRange = this.totalLiquidityForRange.bind(this), this.liquidityNetInDirection = this.liquidityNetInDirection.bind(this), this.claimableFees = this.claimableFees.bind(this), this.positionById = this.positionById.bind(this);
  }
  pools(i = {
    pagination: void 0
  }) {
    const o = k.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Pools", o).then((n) => P.decode(new r.Reader(n)));
  }
  params(i = {}) {
    const o = A.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "Params", o).then((n) => R.decode(new r.Reader(n)));
  }
  userPositions(i) {
    const o = f.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "UserPositions", o).then((n) => y.decode(new r.Reader(n)));
  }
  totalLiquidityForRange(i) {
    const o = I.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "TotalLiquidityForRange", o).then((n) => T.decode(new r.Reader(n)));
  }
  liquidityNetInDirection(i) {
    const o = h.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "LiquidityNetInDirection", o).then((n) => g.decode(new r.Reader(n)));
  }
  claimableFees(i) {
    const o = b.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "ClaimableFees", o).then((n) => _.decode(new r.Reader(n)));
  }
  positionById(i) {
    const o = q.encode(i).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Query", "PositionById", o).then((n) => v.decode(new r.Reader(n)));
  }
}
const ae = (e) => {
  const i = oe.createProtobufRpcClient(e), o = new de(i);
  return {
    pools(t) {
      return o.pools(t);
    },
    params(t) {
      return o.params(t);
    },
    userPositions(t) {
      return o.userPositions(t);
    },
    totalLiquidityForRange(t) {
      return o.totalLiquidityForRange(t);
    },
    liquidityNetInDirection(t) {
      return o.liquidityNetInDirection(t);
    },
    claimableFees(t) {
      return o.claimableFees(t);
    },
    positionById(t) {
      return o.positionById(t);
    }
  };
};
export {
  de as QueryClientImpl,
  ae as createRpcQueryExtension
};
