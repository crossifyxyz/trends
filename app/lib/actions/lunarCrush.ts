'use server'

import { CacheType } from '../types'
import { CoinsResponse } from '../types/lunarCrush'
import connectDB from '../utils/connectDB'
import handleRemoteCache from '../utils/handleRemoteCache'

export async function getCoins() {
  await connectDB()

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
    1,
    true
  )

  return cacheResponse
}
