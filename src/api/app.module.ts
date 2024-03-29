import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { BaseController } from './controllers/base.controller'

import { ProcessesController } from './controllers/processes.controller'
import { ProcessController } from './controllers/process.controller'

import { SiteController } from './controllers/site.controller'

import { ProcessService } from './services/process.service'

import { ProcessesGateway } from './gateway/processes.gateway'
import { PM2Service } from './services/pm2.service'
import { LogsService } from './services/logs.service'

@Module({
  controllers: [
    ProcessesController,
    ProcessController,
    BaseController,
    SiteController
  ],
  providers: [
    Reflector,
    PM2Service,
    LogsService,
    ProcessService,
    ProcessesGateway
  ]
})
export class AppModule {}
