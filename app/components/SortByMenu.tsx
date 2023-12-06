'use client'

import { setComp, useAppDispatch, useAppSelector } from '@/lib/store'
import { Coin } from '@/lib/types'
import { Menu } from 'react-daisyui'

export default function SortByMenu({ isPending }: { isPending: boolean }) {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector((state) => state.comp.sortBy)

  const setSortBy = (sortByKey: keyof Coin) => {
    dispatch(setComp({ sortBy: sortByKey }))
  }

  return (
    <Menu className="bg-base-200 rounded-box">
      <Menu.Title>Sort By</Menu.Title>
      {(
        [
          ['v', 'Volume'],
          ['pc', 'Price Change'],
          ['gs', 'Galaxy Score'],
          ['sd', 'Social Dominance'],
          ['t', 'Tweets'],
        ] as [keyof Coin, string][]
      ).map(([i, t]) => (
        <Menu.Item key={i} onClick={() => setSortBy(i)} disabled={isPending}>
          <a className={`${sortBy === i && 'active'}`}>{t}</a>
        </Menu.Item>
      ))}
    </Menu>
  )
}
