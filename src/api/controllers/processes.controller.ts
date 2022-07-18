import { Controller, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import { PM2Service } from '../services/pm2.service'

import { ProcessInfo } from '@pm2-dash/typings'

@Controller('/api/processes')
export class ProcessesController {
  constructor(private readonly pm2: PM2Service) {}

  @Get('/')
  getProcesses() {
    return { bitches: 'none' }
    this.pm2
  }
}
