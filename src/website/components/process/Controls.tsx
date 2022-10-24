import { ProcessAction, ProcessStatus } from '@pm2-dash/typings'
import { Box, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { FaPlay, FaStop, FaRedo, FaBan, FaWalking } from 'react-icons/fa'
import { PROCESS_CAN_START, PROCESS_CAN_STOP } from './StatusIcon'
import { Loading } from '@jpbbots/theme'
import { useEffect, useState } from 'react'

const BUTTON_SIZE = 56
const ICON_SIZE = BUTTON_SIZE * 0.65

export interface ControlsProps {
  onAction: (action: ProcessAction) => void
  status: ProcessStatus
}

enum ControlStatus {
  CanStart,
  CanStop,
  Loading
}

export function Controls({ onAction, status }: ControlsProps) {
  const [controlStatus, setControlStatus] = useState(ControlStatus.Loading)

  useEffect(() => {
    if (PROCESS_CAN_START.includes(status)) {
      setControlStatus(ControlStatus.CanStart)
    } else if (PROCESS_CAN_STOP.includes(status)) {
      setControlStatus(ControlStatus.CanStop)
    } else {
      setControlStatus(ControlStatus.Loading)
    }
  }, [status])

  return (
    <HStack h="full">
      <Box>
        <Button
          aria-label="start/stop process"
          onClick={() => {
            onAction(
              controlStatus === ControlStatus.CanStop
                ? ProcessAction.Stop
                : ProcessAction.Start
            )
            setControlStatus(ControlStatus.Loading)
          }}
          w={BUTTON_SIZE}
          h={BUTTON_SIZE}
        >
          <Icon
            as={
              {
                [ControlStatus.CanStart]: FaPlay,
                [ControlStatus.CanStop]: FaStop,
                [ControlStatus.Loading]: FaWalking
              }[controlStatus]
            }
            color={
              {
                [ControlStatus.CanStart]: '#7ecc46',
                [ControlStatus.CanStop]: '#ff2738',
                [ControlStatus.Loading]: 'Gray'
              }[controlStatus]
            }
            w={ICON_SIZE}
            h={ICON_SIZE}
          />
        </Button>
      </Box>
      <Box>
        <Button
          aria-label="restart process"
          onClick={() => {
            onAction(ProcessAction.Restart)
            setControlStatus(ControlStatus.Loading)
          }}
          w={BUTTON_SIZE}
          h={BUTTON_SIZE}
        >
          <Icon as={FaRedo} color="#388bb8" w={ICON_SIZE} h={ICON_SIZE} />
        </Button>
      </Box>
    </HStack>
  )
}
