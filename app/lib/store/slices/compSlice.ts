import { Coin } from '@/lib/types/lunarCrush'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeDashbordCoin: null as Coin | null,
  sortBy: 'gs' as keyof Coin,
}

export const compSlice = createSlice({
  name: 'comp',
  initialState,
  reducers: {
    setComp: (state, action: PayloadAction<Partial<CompState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetComp: () => initialState,
  },
})

export type CompState = typeof initialState

// Action creators are generated for each case reducer function
export const { setComp, resetComp } = compSlice.actions

export const compReducer = compSlice.reducer
