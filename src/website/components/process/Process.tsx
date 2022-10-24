import { useSelectedProcess } from '@/../hooks/useProcess'
import { API } from '@/../structures/API'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { LogSection } from '../log/LogSection'
import { Controls } from './Controls'

export function Process() {
  const [selectedProcess] = useSelectedProcess()

  return (
    <VStack pb="20px" w="full" h="full" spacing="20px">
      <Box w="full" h="8%" py="20px" bg="darker.20">
        <HStack w="full" justify="center" align="center" spacing="10px">
          <Box>
            <Text textStyle="heading.sm">
              {selectedProcess != undefined
                ? selectedProcess.name
                : 'Please select a process'}
            </Text>
          </Box>
        </HStack>
      </Box>
      {selectedProcess && (
        <VStack p="1%" spacing="20px" h="92%" w="full">
          <HStack borderRadius="8px" p="30px" w="full" h="30%" bg="darker.20">
            <Box alignSelf="center">
              <Controls
                onAction={(action) => {
                  API.executeAction(selectedProcess.id, action)
                }}
                status={selectedProcess.status}
              />
            </Box>
          </HStack>
          <Box p="10px" borderRadius="8px" w="full" h="70%" bg="darker.20">
            <LogSection />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
