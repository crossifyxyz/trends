export interface CoinsResponse {
  config: {
    sort: string
    desc: boolean
    limit: number
    page: number
    total_rows: number
    generated: number
  }
  data: Coin[]
}

export interface Coin {
  id: number
  s: string
  n: string
  p: number
  p_btc: number
  v: number
  vr: number
  vt: number
  cs: number
  ms: string
  pch: number
  pc: number
  pc7d: number
  mc: number
  mcr: number
  gs: number
  gs_p: number
  ss: number
  as: number
  bl: number
  br: number
  sp: number
  na: number
  md: number
  t: number
  r: number
  yt: number
  sv: number
  u: number
  c: number
  sd: number
  d: number
  cr: number
  acr: number
  acr_p: number
  tc: number
  tr: number[]
  td: number
  categories: string
  chains: string
}
