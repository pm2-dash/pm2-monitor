import { Injectable, Logger } from '@nestjs/common'
import { EventEmitter } from '@jpbberry/typed-emitter'

import pm2 from 'pm2'

interface LogData {
  data: string
  at: number
  process: {
    namespace: string
    name: string
    pm_id: number
  }
}

type LogListener = (log: string) => void
export class LogReader {
  constructor(
    private readonly logs: LogsService,
    private readonly processId: number
  ) {}

  private listener: LogListener

  listen(listener: LogListener) {
    this.listener = listener

    this.logs.on(this.processId, listener)
  }

  detach() {
    this.logs.off(this.processId, this.listener)
  }
}

@Injectable()
export class LogsService extends EventEmitter<{
  [key: number]: [log: string]
}> {
  constructor() {
    super()

    pm2.launchBus((err, bus) => {
      if (err) throw err

      Logger.log('PM2 log bus connected')

      bus.on('log:out', (data: LogData) => {
        this.emit(data.process.pm_id, data.data)
      })
    })
  }

  createReader(processId: number) {
    return new LogReader(this, processId)
  }
}
