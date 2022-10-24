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
import { SimpleProcessInfo } from '@/../store/reducers/processes.reducer'

export function Processes() {
  const [processes] = useProcesses()
  const [searchTerm, setSearchTerm] = useState<string | undefined>()
  const [fuzzy] = useState<FuzzySearch<SimpleProcessInfo>>(
    new FuzzySearch([], ['id', 'name'], { sort: true })
  )

  useEffect(() => {
    fuzzy.haystack = processes
  }, [processes])

  const namespaces = processes.reduce<string[]>((a, b) => {
    if (!a.includes(b.namespace)) a.push(b.namespace)

    return a
  }, [])

  return (
    <VStack
      h="100vh"
      overflowY="scroll"
      bg="darker.10"
      p="10px"
      w="12vw"
      minW="208px"
    >
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
        searchTerm ? (
          fuzzy
            .search(searchTerm)
            .map(({ id }) => <ProcessSelector id={id} key={id} />)
        ) : (
          namespaces.map((ns) => (
            <>
              {ns !== 'default' && (
                <Text alignSelf="flex-start" textStyle="label.md">
                  {ns}
                </Text>
              )}
              {processes
                .filter((x) => x.namespace === ns)
                .map(({ id }) => (
                  <ProcessSelector id={id} />
                ))}
            </>
          ))
        )
      ) : (
        <Loading />
      )}
    </VStack>
  )
}
