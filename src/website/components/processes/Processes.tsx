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
import { FaSearch } from 'react-icons/fa'

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
    <VStack h="100vh" overflowY="scroll" bg="darker.10" p="15px" w="20vw">
      <InputGroup>
        <InputLeftAddon
          onClick={() =>
            document.getElementById('__next')!.classList.toggle('anime')
          }
        >
          <Icon color="brand.100" as={FaSearch} />
        </InputLeftAddon>
        <Input
          value={searchTerm}
          onChange={({ currentTarget }) => {
            setSearchTerm(
              currentTarget.value == '' ? undefined : currentTarget.value
            )
          }}
          placeholder="Search..."
        />
      </InputGroup>
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
