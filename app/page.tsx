'use client'

import useCoins from './hooks/useCoins'
import SwiperCoinSelector from './components/SwiperCoinSelector'
import CoinMetrics from './components/CoinMetrics'
import { useAppSelector } from './lib/store'
import SortByMenu from './components/SortByMenu'

export default function HomePage() {
  const { coinsQuery } = useCoins()

  const sortBy = useAppSelector((state) => state.comp.sortBy)

  const isPending = coinsQuery.isLoading || coinsQuery.isLoading
  const coins =
    // @ts-ignore
    coinsQuery.data?.data?.data.toSorted((a, b) => b[sortBy] - a[sortBy]) ?? []

  const activeCoin = useAppSelector((state) => state.comp.activeDashbordCoin)

  return (
    <div className={'flex flex-col items-center justify-center w-full'}>
      <div
        className={
          'gap-5 flex flex-col md:flex-row lg:flex-row w-full justify-center'
        }
      >
        <SortByMenu />
        <SwiperCoinSelector
          coins={coins}
          isPending={isPending}
          activeCoin={activeCoin}
          className="max-w-full w-96 self-center"
        />
      </div>
      <CoinMetrics coin={activeCoin} />
    </div>
  )
}
