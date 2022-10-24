import { useMutationObserver } from '@/../hooks/useMutationObserver'
import { useSelectedProcess } from '@/../hooks/useProcess'
import { API } from '@/../structures/API'
import {
  Box,
  Button,
  HStack,
  Icon,
  Switch,
  Text,
  VStack
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'

import { Terminal } from 'xterm'

export interface LogSectionProps {}

let serviceId: number

export function LogSection({}: LogSectionProps) {
  const [selectedProcess] = useSelectedProcess()
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<Terminal>()

  useEffect(() => {
    const listener = (log: string) => {
      terminal?.write(log + '\r')
    }
    API.ws.ws.on('LOG', listener)

    return () => {
      API.ws.ws.off('LOG', listener)
    }
  }, [terminal])

  useEffect(() => {
    if (!selectedProcess || selectedProcess.id === serviceId) return

    API.ws.ws.once('LOGS_UNSUBSCRIBED', () => {
      terminal?.clear()

      API.ws.ws.emit('LOGS_SUBSCRIBE', { id: selectedProcess.id })
      serviceId = selectedProcess.id
    })

    API.ws.ws.emit('LOGS_UNSUBSCRIBE')
  }, [selectedProcess])

  useEffect(() => {
    if (terminalRef.current && !terminal) {
      ;(async () => {
        const { Terminal } = await import('xterm')
        const { FitAddon } = await import('xterm-addon-fit')

        const terminal = new Terminal()

        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)

        terminal.open(terminalRef.current!)

        fitAddon.fit()

        setTerminal(terminal)
      })()
    }
  }, [terminalRef])

  return <VStack w="full" h="full" ref={terminalRef} />
}
