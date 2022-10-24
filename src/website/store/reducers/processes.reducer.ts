import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcessInfo } from '@pm2-dash/typings'

export type SimpleProcessInfo = Pick<ProcessInfo, 'id' | 'name' | 'namespace'>

const initialState: SimpleProcessInfo[] = []

const slice = createSlice({
  name: 'processes',
  initialState,
  reducers: {
    addProcess(state, payload: PayloadAction<SimpleProcessInfo>) {
      state.push(payload.payload)

      return state
    },

    deleteProcess(state, payload: PayloadAction<ProcessInfo['id']>) {
      state = state.filter((x) => x.id !== payload.payload)

      return state
    },

    clearProcesses() {
      return []
    }
  }
})

export const processReducer = slice.reducer
export const { addProcess, deleteProcess, clearProcesses } = slice.actions
