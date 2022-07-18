import { useSelectedProcess } from '@/../hooks/useProcess'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

export function Process() {
  const [selectedProcess] = useSelectedProcess()

  return (
    <VStack pb="20px" w="full" h="full" spacing="20px">
      <Box w="full" textAlign="center" py="20px" bg="darker.20">
        <Text textStyle="heading.lg">
          {selectedProcess != undefined
            ? selectedProcess.name
            : 'Please select a process'}
        </Text>
      </Box>
      {selectedProcess && (
        <HStack px="20px" spacing="30px" h="full" w="full">
          <VStack w="70%" h="full" spacing="30px">
            <Box borderRadius="16px" w="full" h="full" bg="darker.20"></Box>
            <Box borderRadius="16px" w="full" h="40%" bg="darker.20"></Box>
          </VStack>
          <Box borderRadius="16px" w="50%" h="full" bg="darker.20"></Box>
        </HStack>
      )}
    </VStack>
  )
}
