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

export interface LogSectionProps {}

let serviceId: number
let logs: string[] = []

export function LogSection({}: LogSectionProps) {
  const [selectedProcess] = useSelectedProcess()
  const logText = useRef<HTMLParagraphElement>(null)
  const logDiv = useRef<HTMLDivElement>(null)

  useMutationObserver(logText, () => {
    const div = logDiv.current!
    console.log({ scrolling })

    if (scrolling) {
      div.scrollTop = div.scrollHeight - div.clientHeight

      if (logs.length > 100) logs.shift()
    }
  })

  const [scrolling, setScrolling] = useState(true)

  useEffect(() => {
    const listener = (log: string) => {
      const txt = logText.current!
      logs.push(log)

      txt.innerText = logs.join('')
    }
    API.ws.ws.on('LOG', listener)

    return () => {
      API.ws.ws.off('LOG', listener)
    }
  }, [])

  useEffect(() => {
    if (!selectedProcess || selectedProcess.id === serviceId) return

    API.ws.ws.once('LOGS_UNSUBSCRIBED', () => {
      logs = []
      logText.current!.innerText = ''

      API.ws.ws.emit('LOGS_SUBSCRIBE', { id: selectedProcess.id })
      serviceId = selectedProcess.id
      setScrolling(true)
    })

    API.ws.ws.emit('LOGS_UNSUBSCRIBE')
  }, [selectedProcess])

  return (
    <VStack w="full" h="full" bg="black" px="10px" pb="10px">
      <Box
        aria-label="console view"
        ref={logDiv}
        h="91%"
        w="full"
        scrollSnapStop="always"
        overflowY="scroll"
        onWheel={() => {
          setScrolling(false)
        }}
      >
        <Text
          h="full"
          color="white"
          fontFamily="Terminal, monospace"
          ref={logText}
        />
      </Box>
      <VStack
        borderRadius="md"
        w="full"
        justify="center"
        h="9%"
        p="8px"
        bg="#1e2126"
      >
        <Button
          w="30px"
          h="30px"
          alignSelf="flex-end"
          onClick={() => {
            if (!scrolling) {
              logs = logs.slice(0, 100)
            }
            setScrolling(!scrolling)
          }}
        >
          <Icon color={scrolling ? 'brand.100' : 'gray'} as={FaArrowDown} />
        </Button>
      </VStack>
    </VStack>
  )
}
