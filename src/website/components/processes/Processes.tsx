import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack
} from '@chakra-ui/react'
import { useProcesses } from '../../hooks/useProcesses'
import { ProcessSelector } from './ProcessSelector'
import { Loading } from '@jpbbots/theme'
import { useState, useEffect } from 'react'
import { ProcessInfo } from '@pm2-dash/typings'

import FuzzySearch from 'fuzzy-search'

export function Processes() {
  const [processes] = useProcesses()
  const [searchTerm, setSearchTerm] = useState<string | undefined>()
  const [fuzzy] = useState<FuzzySearch<Pick<ProcessInfo, 'id' | 'name'>>>(
    new FuzzySearch([], ['id', 'name'], { sort: true })
  )

  useEffect(() => {
    fuzzy.haystack = processes
  }, [processes])

  return (
    <VStack h="100vh" overflowY="scroll" bg="darker.10" p="10px" w="12vw">
      <Input
        value={searchTerm}
        size="sm"
        onChange={({ currentTarget }) => {
          setSearchTerm(
            currentTarget.value == '' ? undefined : currentTarget.value
          )
        }}
        placeholder="Search..."
      />
      {processes.length ? (
        (searchTerm ? fuzzy.search(searchTerm) : processes).map(({ id }) => (
          <ProcessSelector id={id} key={id} />
        ))
      ) : (
        <Loading />
      )}
    </VStack>
  )
}
