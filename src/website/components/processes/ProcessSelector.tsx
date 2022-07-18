import { NumberUtils } from '@/../utils/NumberUtils'
import {
  HStack,
  Button,
  VStack,
  Icon,
  Box,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { FaMicrochip, FaMemory, FaHashtag } from 'react-icons/fa'
import { ProcessStatus } from '@pm2-dash/typings'
import { useProcess, useSelectedProcess } from '../../hooks/useProcess'
import { useDispatch } from 'react-redux'
import { setSelected } from '@/../store/reducers/selected.reducer'

interface ProcessSelectorOptions {
  id: number
}

export function ProcessSelector({ id }: ProcessSelectorOptions) {
  const [process] = useProcess(id)
  const dispatch = useDispatch()

  return (
    <HStack
      key={process.id}
      as={Button}
      onClick={() => {
        dispatch(setSelected(process.id))
      }}
      bg="darker.20"
      justify="space-between"
      borderRadius="16px"
      px="16px"
      py="5px"
      w="full"
    >
      <VStack>
        <HStack w="full" justify="space-between" align="baseline">
          <Text textStyle="heading.sm">{process.name}</Text>
        </HStack>
        <HStack spacing="10px" w="full">
          <HStack>
            <Icon color="lighter.80" as={FaMicrochip} />
            <Text>{String(process.cpuUsage).padStart(2, '0')}%</Text>
          </HStack>
          <HStack>
            <Icon color="lighter.80" as={FaMemory} />
            <Text>{NumberUtils.formatMemory(process.ramUsage)}</Text>
          </HStack>
          <HStack>
            <Icon color="lighter.80" as={FaHashtag} />
            <Text>{process.id}</Text>
          </HStack>
        </HStack>
      </VStack>

      <Tooltip
        label={`${ProcessStatus[process.status]}`}
        color="lighter.80"
        hasArrow
        bg="darker.100"
        p={2}
        borderRadius="md"
      >
        <Box
          borderRadius="100%"
          w="20px"
          h="20px"
          bg={
            {
              [ProcessStatus.Online]: '#7ecc46',
              [ProcessStatus.Stopping]: '#b8882f',
              [ProcessStatus.Stopped]: 'gray',
              [ProcessStatus.Launching]: '#388bb8',
              [ProcessStatus.Errored]: '#ff2738',
              [ProcessStatus.OneLaunchStatus]: 'black'
            }[process.status]
          }
        />
      </Tooltip>
    </HStack>
  )
}
