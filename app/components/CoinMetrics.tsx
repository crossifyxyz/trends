'use client'

import { Coin } from '@/lib/types'
import { convertToInternationalCurrencySystem } from '@/lib/utils'
import { Skeleton, Stats, Table } from 'react-daisyui'

export default function CoinMetrics({ coin }: { coin: Coin | null }) {
  console.log(coin)
  return (
    <div className={'flex flex-col gap-4 items-center max-w-full'}>
      {!!coin ? (
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

      {!!coin ? (
        <Table className="overflow-x-scroll">
          <Table.Head>
            <span>Metric</span>
            <span>Timeframe</span>
            <span>Value</span>
          </Table.Head>

          <Table.Body>
            {!!coin.gs && (
              <Table.Row>
                <span>Galaxy Score</span>
                <span>Inspection</span>
                <span>{coin.gs}</span>
              </Table.Row>
            )}
            {!!coin.t && (
              <Table.Row>
                <span>Tweets</span>
                <span>Inspection</span>
                <span>{coin.t}</span>
              </Table.Row>
            )}
            {!!coin.sd && (
              <Table.Row>
                <span>Social Dominance</span>
                <span>Inspection</span>
                <span>{coin.sd.toFixed(3)}%</span>
              </Table.Row>
            )}
            {[
              ['1h', coin.pch],
              ['24h', coin.pc],
              ['7d', coin.pc7d],
            ].map(
              (i) =>
                !!i[1] && (
                  <Table.Row key={i[0]}>
                    <span>Price Change</span>
                    <span>{i[0]}</span>
                    <span
                      className={
                        Number(i[1]) > 0 ? 'text-success' : 'text-warning'
                      }
                    >
                      {i[1]}%
                    </span>
                  </Table.Row>
                )
            )}
            {!!coin.v && (
              <Table.Row>
                <span>Volume</span>
                <span>24h</span>
                <span>{convertToInternationalCurrencySystem(coin.v)}</span>
              </Table.Row>
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
