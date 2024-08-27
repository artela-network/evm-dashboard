import { _ as n, M as r, i as c, m as t, j as a, k as d, l as h, n as l, o as g, p, q as u, r as m } from "./main-0185a46e.js";
class f {
  constructor(e) {
    n(this, "rpc", void 0), this.rpc = e, this.createPosition = this.createPosition.bind(this), this.withdrawPosition = this.withdrawPosition.bind(this), this.collectFees = this.collectFees.bind(this), this.collectIncentives = this.collectIncentives.bind(this), this.fungifyChargedPositions = this.fungifyChargedPositions.bind(this);
  }
  createPosition(e) {
    const s = r.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CreatePosition", s).then((i) => c.decode(new t.Reader(i)));
  }
  withdrawPosition(e) {
    const s = a.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "WithdrawPosition", s).then((i) => d.decode(new t.Reader(i)));
  }
  collectFees(e) {
    const s = h.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CollectFees", s).then((i) => l.decode(new t.Reader(i)));
  }
  collectIncentives(e) {
    const s = g.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "CollectIncentives", s).then((i) => p.decode(new t.Reader(i)));
  }
  fungifyChargedPositions(e) {
    const s = u.encode(e).finish();
    return this.rpc.request("osmosis.concentratedliquidity.v1beta1.Msg", "FungifyChargedPositions", s).then((i) => m.decode(new t.Reader(i)));
  }
}
export {
  f as MsgClientImpl
};
