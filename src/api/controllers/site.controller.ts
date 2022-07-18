import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import path from 'path'

import Next from 'next'

@Controller()
export class SiteController {
  server: ReturnType<typeof Next>
  constructor() {
    this.server = Next({
      quiet: true,
      dev: true,
      dir: path.resolve(__dirname, '../../../src', './website')
    })

    void this.server.prepare()
  }

  @Get('*')
  async get(@Req() req: Request, @Res() res: Response) {
    void this.server.getRequestHandler()(req, res)
  }
}
