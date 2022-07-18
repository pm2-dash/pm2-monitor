import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack
} from '@chakra-ui/react'
import { Process } from '../components/process/Process'
import { Processes } from '../components/processes/Processes'

export default function Home() {
  return (
    <HStack w="full" spacing="0px" align="start">
      <Processes />
      <Process />
    </HStack>
  )
}
