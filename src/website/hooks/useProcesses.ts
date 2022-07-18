import { RootState } from '../store'

import { useSelector } from 'react-redux'

export const useProcessState = (): RootState['processes'] =>
  useSelector((state: RootState) => state.processes)

export const useProcesses = () => {
  const processes = useProcessState()

  return [processes] as const
}
