import { Text, TextProps } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

function formatDuration(dur: number) {
  var sec_num = dur / 1000
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  const pad = (num: number) => `${num.toFixed(0)}`.padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export interface TimeTextProps extends TextProps {
  timeFrom: Date | null
}
export function TimeText({ timeFrom, ...textProps }: TimeTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!timeFrom) textRef.current!.innerText = 'N/A'
    else {
      const interval = setInterval(() => {
        textRef.current!.innerText = formatDuration(
          Date.now() - timeFrom.getTime()
        )
      }, 250)

      return () => {
        clearInterval(interval)
      }
    }
  }, [timeFrom])

  return <Text {...textProps} ref={textRef}></Text>
}
