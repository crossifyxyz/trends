'use client'

import useCoins from './hooks/useCoins'
import SwiperCoinSelector from './components/SwiperCoinSelector'
import CoinMetrics from './components/CoinMetrics'
import { setComp, useAppDispatch, useAppSelector } from './lib/store'
import SortByMenu from './components/SortByMenu'
import { useEffect } from 'react'
import { useAppContext } from './providers'

export default function HomePage() {
  const { isHydrated } = useAppContext()
  const { coinsQuery } = useCoins()

  const sortBy = useAppSelector((state) => state.comp.sortBy)

  const isPending = coinsQuery.isLoading || coinsQuery.isLoading || !isHydrated
  const coins =
    coinsQuery.data?.data.toSorted(
      (a, b) => Number(b[sortBy]) - Number(a[sortBy])
    ) ?? []

  const activeCoin = useAppSelector((state) => state.comp.activeDashbordCoin)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setComp({ activeDashbordCoin: coins[0] }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return (
    <div className={'flex flex-col items-center justify-center w-full'}>
      <div
        className={
          'gap-5 flex flex-col md:flex-row lg:flex-row w-full justify-center'
        }
      >
        <SortByMenu isPending={isPending} />
        <SwiperCoinSelector
          coins={coins}
          isPending={isPending}
          activeCoin={activeCoin}
          className="max-w-full w-96 self-center"
        />
      </div>
      <CoinMetrics isPending={isPending} coin={activeCoin} />
    </div>
  )
}
