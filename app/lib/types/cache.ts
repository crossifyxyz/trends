import { CoinsResponse } from './lunarCrush'

export enum CacheType {
  LunarCrushCoins = 'LUNAR_CRUSH_COINS',
  // FIAT_RATE = 'FIAT_RATE',
}

export interface CacheBase {
  type: CacheType
  updatedAt: number
  idle?: boolean
}

export interface LunarCrushCoinsCache extends CacheBase {
  type: CacheType.LunarCrushCoins
  data: CoinsResponse
}

// export interface TokenBalancesCache extends Omit<CacheBase, 'type'> {
//   data: TokenAmount[]
// }

// export interface FiatRateCache extends CacheBase {
//   type: CacheType.FIAT_RATE
//   data: FiatRate
// }
