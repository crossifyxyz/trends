'use client'

import { ReinforcedCoin } from '@/lib/types'
import { convertToInternationalCurrencySystem } from '@/lib/utils'
import { Skeleton, Stats, Table } from 'react-daisyui'

export default function CoinMetrics({
  coin,
  isPending,
}: {
  coin: ReinforcedCoin | null
  isPending: boolean
}) {
  return (
    <div className={'flex flex-col gap-4 items-center max-w-full'}>
      {!!coin && !isPending ? (
        <Stats className="shadow lg:scale-75 scale-50">
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Price USD</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">
              {convertToInternationalCurrencySystem(coin.p)}
            </Stats.Stat.Item>
          </Stats.Stat>

          <Stats.Stat>
            <Stats.Stat.Item variant="title">Market Cap</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">
              {convertToInternationalCurrencySystem(coin.mc)}
            </Stats.Stat.Item>
          </Stats.Stat>

          <Stats.Stat>
            <Stats.Stat.Item variant="title">
              Circulating Supply
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="value">
              {!coin.ms
                ? convertToInternationalCurrencySystem(coin.cs)
                : ((coin.cs / Number(coin.ms)) * 100).toFixed(0)}
              {!!coin.ms && '%'}
            </Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
      ) : (
        <Skeleton className="h-6 w-52" />
      )}

      {!!coin && !isPending ? (
        <Table className="overflow-x-scroll">
          <Table.Head>
            <span>Metric</span>
            <span>Timeframe</span>
            <span>Value</span>
          </Table.Head>

          <Table.Body>
            {[
              [coin.sdPchLow.toFixed(0) + '%', 'Social 1h Low', '1h'],
              [coin.gs, 'Galaxy Score'],
              [coin.t, 'Tweets'],
              [coin.sd.toFixed(5), 'Social Dominance'],
              [coin.pch + '%', 'Price Change', '1h', true],
              [coin.pc + '%', 'Price Change', '24h', true],
              [coin.pc7d + '%', 'Price Change', '7d', true],
              [convertToInternationalCurrencySystem(coin.v), 'Volume', '24h'],
            ].map(
              (i, index) =>
                !!i[0] && (
                  <Table.Row key={index}>
                    <span>{i[1]}</span>
                    <span>{i[2] ?? 'Inspection'}</span>
                    <span
                      className={
                        !i[3]
                          ? ''
                          : Number(i[0]) > 0
                            ? 'text-success'
                            : 'text-warning'
                      }
                    >
                      {i[0]}
                    </span>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      ) : (
        <>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </>
      )}
    </div>
  )
}
