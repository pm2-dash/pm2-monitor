import { Controller, Get } from '@nestjs/common'

@Controller('/api')
export class BaseController {
  @Get('/')
  index() {
    return {
      hello: 'world'
    }
  }
}
