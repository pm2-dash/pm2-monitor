import { useSelectedProcess } from '@/../hooks/useProcess'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Controls } from './Controls'
import { StatusIcon } from './StatusIcon'

export function Process() {
  const [selectedProcess] = useSelectedProcess()

  return (
    <VStack pb="20px" w="full" h="full" spacing="20px">
      <Box w="full" py="20px" bg="darker.20">
        <HStack w="full" justify="center" align="center" spacing="10px">
          <Text textStyle="heading.sm">
            {selectedProcess != undefined
              ? selectedProcess.name
              : 'Please select a process'}
          </Text>
          {selectedProcess !== undefined && (
            <StatusIcon status={selectedProcess.status} w="20px" h="20px" />
          )}
        </HStack>
      </Box>
      {selectedProcess && (
        <VStack px="20px" spacing="20px" h="full" w="full">
          <Box borderRadius="8px" w="full" h="30%" bg="darker.20">
            <Text
              whiteSpace="pre"
              children={JSON.stringify(selectedProcess, null, 4)}
            />
          </Box>
          <Box borderRadius="8px" w="full" h="70%" bg="darker.20"></Box>
        </VStack>
      )}
    </VStack>
  )
}
