import { Controller, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import { ProcessService } from '../services/process.service'

import { ProcessInfo } from '@pm2-dash/typings'

@Controller('/api/processes')
export class ProcessesController {
  constructor(private readonly pm2: ProcessService) {}

  @Get('/')
  getProcesses() {
    return { bitches: 'none' }
    this.pm2
  }
}
