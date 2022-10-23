import { Controller, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import { ProcessService } from '../services/process.service'

import { ProcessInfo } from '@pm2-dash/typings'
import { ApiResponse } from '@nestjs/swagger'
import { ProcessAnnotation } from '../annotations/ProcessAnnotation'

@Controller('/api/processes')
export class ProcessesController {
  constructor(private readonly pm2: ProcessService) {}

  @Get('/')
  @ApiResponse({
    description: 'Get a list of processes running on the local machine',
    type: ProcessAnnotation,
    isArray: true
  })
  getProcesses() {
    return this.pm2.processes
  }
}
