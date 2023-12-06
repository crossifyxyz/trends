'use client'

import { getCoins } from '@/lib/actions/lunarCrush'
import { useQuery } from '@tanstack/react-query'
import useServerAction from './useServerAction'

export default function useCoins() {
  const serverAction = useServerAction()
  const coinsQuery = useQuery({
    queryKey: ['coins'],
    queryFn: () => serverAction(getCoins),
  })

  return { coinsQuery }
}
