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
import {
  useProcess,
  useSelectedProcess,
  useSelectedState
} from '../../hooks/useProcess'
import { useDispatch } from 'react-redux'
import { setSelected } from '@/../store/reducers/selected.reducer'
import { StatusIcon } from '../process/StatusIcon'

interface ProcessSelectorOptions {
  id: number
}

const statFontSize = '12px'

export function ProcessSelector({ id }: ProcessSelectorOptions) {
  const [process] = useProcess(id)
  const dispatch = useDispatch()
  const selected = useSelectedState()

  return (
    <HStack
      key={process.id}
      as={Button}
      onClick={() => {
        dispatch(setSelected(process.id))
      }}
      bg={selected === process.id ? 'lighter.10' : 'darker.20'}
      justify="space-between"
      borderRadius="8px"
      px="8px"
      py="5px"
      w="full"
    >
      <VStack w="full">
        <HStack w="full" justify="space-between" align="baseline">
          <Text textStyle="label.sm">{process.name}</Text>

          <StatusIcon status={process.status} w="15px" h="15px" />
        </HStack>
        <HStack spacing="auto" justify="space-evenly" w="full">
          <HStack align="center">
            <Icon color="lighter.60" w="12px" h="12px" as={FaMicrochip} />
            <Text fontSize={statFontSize}>
              {String(process.cpuUsage).padStart(2, '0')}%
            </Text>
          </HStack>
          <HStack align="center">
            <Icon color="lighter.60" w="12px" h="12px" as={FaMemory} />
            <Text fontSize={statFontSize}>
              {NumberUtils.formatMemory(process.ramUsage)}
            </Text>
          </HStack>
          <HStack spacing="2px">
            <Icon color="lighter.60" w="12px" h="12px" as={FaHashtag} />
            <Text fontSize={statFontSize}>{process.id}</Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
