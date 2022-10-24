require('module-alias/register')
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './api/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter())

  const config = new DocumentBuilder()
    .setTitle('PM2 Dash API')
    .setDescription('Info')
    .setVersion(process.version)
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(2349)
}
bootstrap()
