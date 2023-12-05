import { Schema } from 'mongoose'
import type { Coin, CoinsResponse, LunarCrushCoinsCache } from '../types'

export const CoinSchema = new Schema<Coin>(
  {
    id: { type: Number },
    s: { type: String },
    n: { type: String },
    p: { type: Number },
    p_btc: { type: Number },
    v: { type: Number },
    vr: { type: Number },
    vt: { type: Number },
    cs: { type: Number },
    ms: { type: String },
    pch: { type: Number },
    pc: { type: Number },
    pc7d: { type: Number },
    mc: { type: Number },
    mcr: { type: Number },
    gs: { type: Number },
    gs_p: { type: Number },
    ss: { type: Number },
    as: { type: Number },
    bl: { type: Number },
    br: { type: Number },
    sp: { type: Number },
    na: { type: Number },
    md: { type: Number },
    t: { type: Number },
    r: { type: Number },
    yt: { type: Number },
    sv: { type: Number },
    u: { type: Number },
    c: { type: Number },
    sd: { type: Number },
    d: { type: Number },
    cr: { type: Number },
    acr: { type: Number },
    acr_p: { type: Number },
    tc: { type: Number },
    tr: { type: [Number] },
    td: { type: Number },
    categories: { type: String },
    chains: { type: String },
  },
  { _id: false }
)

// Create Schema
export const LunarCrushCoinSchema = new Schema<CoinsResponse>(
  {
    config: {
      sort: { type: String },
      desc: { type: Boolean },
      limit: { type: Number },
      page: { type: Number },
      total_rows: { type: Number },
      generated: { type: Number },
      _id: false,
    },
    data: {
      type: [CoinSchema],
      required: true,
      _id: false,
    },
  },
  { _id: false }
)

export const LunarCrushCoinCacheSchema = new Schema<LunarCrushCoinsCache>({
  data: {
    type: LunarCrushCoinSchema,
    required: true,
    _id: false,
  },
})
