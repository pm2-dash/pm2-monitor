import { ProcessStatus } from '@pm2-dash/typings'
import { Tooltip, Box, Flex, BoxProps } from '@chakra-ui/react'

export interface StatusIconProps extends BoxProps {
  status: ProcessStatus
}
export function StatusIcon({ status, ...boxProps }: StatusIconProps) {
  return (
    <Flex align="center" h="full">
      <Tooltip
        label={`${ProcessStatus[status]}`}
        color="lighter.80"
        hasArrow
        bg="darker.100"
        p={2}
        borderRadius="md"
      >
        <Box
          borderRadius="100%"
          {...boxProps}
          bg={
            {
              [ProcessStatus.Online]: '#7ecc46',
              [ProcessStatus.Stopping]: '#b8882f',
              [ProcessStatus.Stopped]: 'gray',
              [ProcessStatus.Launching]: '#388bb8',
              [ProcessStatus.Errored]: '#ff2738',
              [ProcessStatus.OneLaunchStatus]: 'black'
            }[status]
          }
        />
      </Tooltip>
    </Flex>
  )
}
