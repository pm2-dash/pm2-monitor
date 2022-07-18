import { configureStore } from '@reduxjs/toolkit'
import { processReducer } from './reducers/processes.reducer'
import { selectedReducer } from './reducers/selected.reducer'

const reducer = {
  processes: processReducer,
  selected: selectedReducer
} as const

export type PreloadStore = typeof reducer

export const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store['getState']>
