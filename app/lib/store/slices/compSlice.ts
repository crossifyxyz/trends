import { ReinforcedCoin } from '@/lib/types/lunarCrush'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeDashbordCoin: null as ReinforcedCoin | null,
  sortBy: 'gs' as keyof ReinforcedCoin,
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
