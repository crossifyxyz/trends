'use client'

import { setComp, useAppDispatch, useAppSelector } from '@/lib/store'
import { Coin } from '@/lib/types'
import { Menu } from 'react-daisyui'

export default function SortByMenu({ isPending }: { isPending: boolean }) {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector((state) => state.comp.sortBy)

  const setSortBy = (sortByKey: string) => {
    dispatch(setComp({ sortBy: sortByKey as keyof Coin }))
  }

  return (
    <Menu className="bg-base-200 rounded-box">
      <Menu.Title>Sort By</Menu.Title>
      {[
        ['v', 'Volume'],
        ['pc', 'Price Change'],
        ['gs', 'Galaxy Score'],
        ['sd', 'Social Dominance', [['sdPchLow', '1h Low']]],
        ['t', 'Tweets'],
      ].map((i) => {
        if (!i[2]) {
          const [s, n] = i as string[]
          return (
            <Menu.Item key={s} disabled={isPending}>
              <a
                onClick={() => setSortBy(s)}
                className={`${!isPending && sortBy === s && 'active'}`}
              >
                {n}
              </a>
            </Menu.Item>
          )
        }

        const [s, n, sub] = i as [string, string, string[][]]

        return (
          <Menu.Item key={s} disabled={isPending}>
            <a
              onClick={() => setSortBy(s)}
              className={`${!isPending && sortBy === s && 'active'}`}
            >
              {n}
            </a>
            <Menu>
              {sub.map(([sS, sN]) => (
                <Menu.Item key={sS} disabled={isPending}>
                  <a
                    onClick={() => setSortBy(sS)}
                    className={`${!isPending && sortBy === sS && 'active'}`}
                  >
                    {sN}
                  </a>
                </Menu.Item>
              ))}
            </Menu>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}
