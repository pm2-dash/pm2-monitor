import { Injectable } from '@nestjs/common'
import { ProcessInfo, ProcessStatus } from '@pm2-dash/typings'
import { EventEmitter } from '@jpbberry/typed-emitter'

const randomLetters = () => Math.random().toString(20).substring(2)
let currentId = 0

const randomFromEnum = (b: any): any => {
  const keys = Object.values(b).filter((x) => Number.isInteger(x))

  return keys[Math.floor(Math.random() * keys.length)]
}

@Injectable()
export class PM2Service extends EventEmitter<{ PROCESS_UPDATED: ProcessInfo }> {
  processes: ProcessInfo[]

  constructor() {
    super()

    this.listProcesses().then((processes) => {
      this.processes = processes
      setInterval(async () => {
        for (let oldProcess of processes) {
          const newProcess = this.createRandomProcess()
          newProcess.id = oldProcess.id
          newProcess.name = oldProcess.name
          newProcess.status = oldProcess.status

          this.emit('PROCESS_UPDATED', newProcess)

          await new Promise((res) =>
            setTimeout(res, Math.floor(Math.random() * 500))
          )
        }
      }, 2e3)
    })
  }
  private createRandomProcess(): ProcessInfo {
    return {
      name: randomLetters(),
      id: currentId++,
      cpuUsage: 1 + Math.floor(Math.random() * 99),
      ramUsage: 10000 + Math.floor(Math.random() * 99000000),
      status: ProcessStatus.Online,
      uptime: 20000000 + Math.floor(Math.random() * 99213123),
      metadata: {
        createdAt: Date.now() - Math.floor(Math.random() * 90000),
        execPath: '//balls',
        interpreter: 'node.gay yes'
      }
    }
  }

  async listProcesses(): Promise<ProcessInfo[]> {
    if (this.processes) return this.processes

    let res: ProcessInfo[] = []
    for (let i = 0; i < 30; i++) {
      res.push(this.createRandomProcess())
    }

    return res
  }
}
