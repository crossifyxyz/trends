import { useAppDispatch, setComp, useAppSelector } from '@/lib/store'
import { Global, css } from '@emotion/react'
import { ReinforcedCoin } from '@/lib/types'
import { Skeleton, Divider, Badge } from 'react-daisyui'
import { EffectCoverflow, Virtual } from 'swiper/modules'
import { SwiperClass, Swiper, SwiperSlide } from 'swiper/react'
import { getCoinIdFromName } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Countdown from './ui/Countdown'

export default function SwiperCoinSelector({
  activeCoin,
  coins,
  isPending,
  timestamp,
  ...props
}: {
  activeCoin: ReinforcedCoin | null
  coins: ReinforcedCoin[]
  isPending: boolean
  timestamp?: number
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const [swiper, setSwiper] = useState<SwiperClass>()
  const sortBy = useAppSelector((state) => state.comp.sortBy)
  const dispatch = useAppDispatch()

  const findActiveSlideIndex = () => {
    const index = coins.findIndex((coin) => coin.n === activeCoin?.n)

    if (index === -1) {
      dispatch(setComp({ activeDashbordCoin: coins[0] }))
      return 0
    }

    return index
  }

  useEffect(() => {
    if (swiper) swiper.slideTo(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return (
    <div {...props}>
      <Global styles={swiperStyles} />
      {isPending || !activeCoin?.n ? (
        <Skeleton className="h-4 w-28" />
      ) : (
        <div className="flex justify-between items-center">
          <h2
            className={'max-w-[70%] link'}
            onClick={() => {
              const id = getCoinIdFromName(activeCoin.n)
              window.confirm('Open CoinGecko ' + activeCoin.n + ' Link?') &&
                window.open('https://www.coingecko.com/en/coins/' + id)
            }}
          >
            {activeCoin.n}
          </h2>
          {/* <Countdown timestamp={timestamp} seconds={20 * 60} /> */}
          <Badge outline>{activeCoin.s}</Badge>
        </div>
      )}
      <Divider />
      {isPending ? (
        <Skeleton className="w-52 h-52 rounded-full m-auto" />
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            setSwiper(swiper)
            swiper.slideTo(findActiveSlideIndex())
          }}
          onActiveIndexChange={(e) =>
            dispatch(setComp({ activeDashbordCoin: coins[e.activeIndex] }))
          }
          effect={'coverflow'}
          virtual
          grabCursor
          centeredSlides
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Virtual]}
        >
          {coins.map((coin, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="rounded-full"
                alt={coin.n}
                src={`https://cdn.lunarcrush.com/${getCoinIdFromName(
                  coin.n
                )}.png`}
                onError={(e: any) => {
                  e.target.onerror = null
                  e.target.src = `/fallback-token.svg`
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Divider />
    </div>
  )
}

const swiperStyles = css(`

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: auto;
}

.swiper-slide img {
  user-select: none;
  display: block;
  width: 100%;
}
`)
