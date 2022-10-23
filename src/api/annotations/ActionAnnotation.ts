import { ApiProperty } from '@nestjs/swagger'
import { ActionBody, ProcessAction } from '@pm2-dash/typings'

export class ActionAnnotation implements ActionBody {
  @ApiProperty({
    description: 'Action to execute',
    enum: ProcessAction
  })
  action: ProcessAction
}
