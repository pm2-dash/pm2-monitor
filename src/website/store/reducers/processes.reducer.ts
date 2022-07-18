import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcessInfo } from '@pm2-dash/typings'

const initialState: Pick<ProcessInfo, 'id' | 'name'>[] = []

const slice = createSlice({
  name: 'processes',
  initialState,
  reducers: {
    addProcess(
      state,
      payload: PayloadAction<Pick<ProcessInfo, 'id' | 'name'>>
    ) {
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
