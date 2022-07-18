import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { BaseController } from './controllers/base.controller'
import { ProcessesController } from './controllers/processes.controller'

import { SiteController } from './controllers/site.controller'

import { PM2Service } from './services/pm2.service'

import { ProcessesGateway } from './gateway/processes.gateway'

@Module({
  controllers: [ProcessesController, BaseController, SiteController],
  providers: [Reflector, PM2Service, ProcessesGateway]
})
export class AppModule {}
