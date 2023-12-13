'use server'

import cache from '../cache'
import { CacheType } from '../types'
import {
  Coin,
  CoinsResponse,
  ReinforcedCoin,
  ReinforcedCoinsResponse,
} from '../types/lunarCrush'
import { calculateMetric } from '../utils'
import handleRemoteCache from '../utils/handleRemoteCache'

const fetchCoins = (): Promise<CoinsResponse> =>
  fetch('https://lunarcrush.com/api4/coins?sort=galaxy_score&desc=1', {
    headers: {
      Authorization: `Bearer ${process.env.LUNAR_CRUSH_API_KEY}`,
    },
  }).then((res) => res.json())

export async function getCoins() {
  const localCache = cache.get<ReinforcedCoinsResponse>(
    CacheType.LunarCrushCoins
  )

  if (!!localCache) return localCache

  const remoteCache = await handleRemoteCache(
    CacheType.LunarCrushCoins,
    fetchCoins,
    {},
    0.2,
    true
  )

  if (!remoteCache.data) throw new Error('No cache response')

  let filteredData: Coin[] = []

  remoteCache.data.forEach((coin) => {
    if (!!coin.p) filteredData.push(coin)
  })

  const reinforcedData: ReinforcedCoin[] = filteredData.map((coin) => ({
    ...coin,
    sdPchLow: calculateMetric([
      { weight: 0.5, value: coin.sd },
      { weight: -0.5, value: coin.pch },
    ]),
  }))

  const newData: ReinforcedCoinsResponse = {
    ...remoteCache,
    data: reinforcedData,
  }

  cache.set(CacheType.LunarCrushCoins, newData)

  return newData
}
