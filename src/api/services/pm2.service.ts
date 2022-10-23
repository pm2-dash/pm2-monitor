import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter } from '@jpbberry/typed-emitter'
import pm2 from 'pm2'

@Injectable()
export class PM2Service extends EventEmitter<{
  STARTED: void
}> {
  public connected = false

  constructor() {
    super()

    this.createPM2Controller()
  }

  private createPM2Controller() {
    pm2.connect((error) => {
      if (error) throw error

      Logger.log('Connected to PM2')

      this.connected = true

      this.emit('STARTED')
    })
  }

  public async waitForStart(): Promise<void> {
    return new Promise((resolve) => {
      if (this.connected) return resolve()

      this.once('STARTED', resolve)
    })
  }
}
