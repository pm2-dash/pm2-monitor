import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import { FaPlay, FaStop, FaRedo, FaBan } from 'react-icons/fa'

export function Controls() {
  return (
    <HStack h="full">
      <Box>
        <Button w="78px" h="78px">
          <Icon as={FaPlay} color="#7ecc46" w="50px" h="50px" />
        </Button>
      </Box>
      <Box>
        <Button w="78px" h="78px">
          <Icon as={FaStop} color="#ff2738" w="50px" h="50px" />
        </Button>
      </Box>
      <Box>
        <Button w="78px" h="78px">
          <Icon as={FaRedo} color="#388bb8" w="50px" h="50px" />
        </Button>
      </Box>
      <Box></Box>
    </HStack>
  )
}
