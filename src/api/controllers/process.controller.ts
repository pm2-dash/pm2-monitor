import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { Request, Response } from 'express'
import { ProcessService } from '../services/process.service'

import { ActionBody, ProcessAction, ProcessInfo } from '@pm2-dash/typings'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { ProcessAnnotation } from '../annotations/ProcessAnnotation'
import { ActionAnnotation } from '../annotations/ActionAnnotation'

type ErrProcCallback = (err: Error, proc: any) => void

import pm2 from 'pm2'
import { ApiError } from 'next/dist/server/api-utils'

@Controller('/api/processes/:id')
export class ProcessController {
  constructor(private readonly pm2: ProcessService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Gets the process information',
    type: ProcessAnnotation
  })
  @ApiParam({ name: 'id', description: 'PM2 ID of the process' })
  getProcess(@Param('id') id: number) {
    return this.pm2.processes.find((x) => x.id == id)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Executes an action on the process'
  })
  @ApiBody({
    description: 'Action information',
    type: ActionAnnotation
  })
  @ApiParam({ name: 'id', description: 'PM2 ID of the process' })
  @Post('/action')
  action(@Param('id') stringId: string, @Body() action: ActionBody) {
    const process = this.pm2.processes.find((x) => x.id === parseInt(stringId))

    if (!process) throw new ApiError(HttpStatus.NOT_FOUND, 'Invalid process')

    return new Promise((resolve, reject) => {
      const cb: ErrProcCallback = (err, _proc) => {
        if (err)
          reject(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, err.message))
        else resolve({ success: true })
      }

      switch (action.action) {
        case ProcessAction.Start:
        case ProcessAction.Restart:
          pm2.restart(process.id, cb)
          break
        case ProcessAction.Stop:
          pm2.stop(process.id, cb)
          break
        default:
          reject(new ApiError(HttpStatus.NOT_ACCEPTABLE, 'Invalid action'))
          break
      }
    })
  }
}
