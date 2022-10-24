import { ApiProperty } from '@nestjs/swagger'
import { ProcessInfo, ProcessMetadata, ProcessStatus } from '@pm2-dash/typings'

export class ProcessAnnotation implements ProcessInfo {
  @ApiProperty({
    description: 'Name of the process',
    example: 'webscraper'
  })
  name: string

  @ApiProperty({
    description: 'Unique PM2 ID of the process',
    example: 2
  })
  id: number

  @ApiProperty({
    description: 'Status of process',
    enum: ProcessStatus
  })
  status: ProcessStatus

  @ApiProperty({
    description: 'Ram usage as bytes',
    example: 128931293
  })
  ramUsage: number

  @ApiProperty({
    description: 'CPU usage as a percentage',
    example: 12
  })
  cpuUsage: number

  @ApiProperty({
    description: 'Uptime as the date at which the process started',
    example: 1666548780649
  })
  startedDate: number

  @ApiProperty({
    description: 'Number of unhealthy restarts',
    example: 5
  })
  restarts: number

  @ApiProperty({
    description: 'Namespace the process belongs to',
    example: 'bots'
  })
  namespace: string

  metadata: ProcessMetadata
}
