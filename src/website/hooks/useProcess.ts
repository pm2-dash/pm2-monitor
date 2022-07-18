import { useEffect, useState } from 'react'

import { ProcessInfo } from '@pm2-dash/typings'
import { API } from '../structures/API'

import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const useSelectedState = (): RootState['selected'] =>
  useSelector((state: RootState) => state.selected)

export const useProcess = (id: number) => {
  const [process, setProcess] = useState<ProcessInfo>(API.storedProcesses[id])
  useEffect(() => {
    const fn = (process: ProcessInfo) => {
      setProcess(process)
    }

    API.processListener.on(`${id}`, fn)

    return () => {
      API.processListener.off(`${id}`, fn)
    }
  }, [])

  return [process] as const
}

export const useSelectedProcess = () => {
  const selectedProcess = useSelectedState()
  const [process, setProcess] = useState<ProcessInfo | undefined>(undefined)

  useEffect(() => {
    if (selectedProcess == undefined) return setProcess(undefined)

    if (!process || process.id !== selectedProcess)
      setProcess(API.storedProcesses[selectedProcess])

    const fn = (process: ProcessInfo) => {
      setProcess(process)
    }

    API.processListener.on(`${selectedProcess}`, fn)

    return () => {
      API.processListener.off(`${selectedProcess}`, fn)
    }
  }, [selectedProcess])

  return [process] as const
}
