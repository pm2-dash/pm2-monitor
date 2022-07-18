import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcessInfo } from '@pm2-dash/typings'

const initialState = null as ProcessInfo['id'] | null

const slice = createSlice({
  name: 'selected',
  initialState: initialState,
  reducers: {
    setSelected(state, payload: PayloadAction<ProcessInfo['id'] | null>) {
      return payload.payload
    }
  }
})

export const selectedReducer = slice.reducer
export const { setSelected } = slice.actions
