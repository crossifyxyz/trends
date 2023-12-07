'use server'

import { CacheType } from '../types'
import { Coin, CoinsResponse } from '../types/lunarCrush'
import handleRemoteCache from '../utils/handleRemoteCache'

export async function getCoins() {
  const handleFetch = (): Promise<CoinsResponse> =>
    fetch('https://lunarcrush.com/api4/coins?sort=galaxy_score&desc=1', {
      headers: {
        Authorization: `Bearer ${process.env.LUNAR_CRUSH_API_KEY}`,
      },
    }).then((res) => res.json())

  const cacheResponse = await handleRemoteCache(
    CacheType.LunarCrushCoins,
    handleFetch,
    {},
    0.2,
    true
  )

  if (!cacheResponse.data) throw new Error('No cache response')

  const filteredData: Coin[] = []

  cacheResponse.data.forEach((coin) => {
    if (!!coin.p) filteredData.push(coin)
  })

  return { ...cacheResponse, data: { data: filteredData } }
}
