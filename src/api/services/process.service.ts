import { Injectable, Logger } from '@nestjs/common'
import { ProcessInfo, ProcessStatus } from '@pm2-dash/typings'
import { EventEmitter } from '@jpbberry/typed-emitter'
import pm2, { ProcessDescription } from 'pm2'
import { PM2Service } from './pm2.service'

@Injectable()
export class ProcessService extends EventEmitter<{
  PROCESS_UPDATED: ProcessInfo
  PROCESS_CREATED: ProcessInfo
  PROCESS_DELETE: Pick<ProcessInfo, 'id'>
}> {
  processes: ProcessInfo[] = []

  interval = 500

  constructor(private readonly pm2: PM2Service) {
    super()

    pm2.waitForStart().then(() => {
      this.setupInterval()
    })
  }

  private translateProcess(info: ProcessDescription): ProcessInfo {
    if (!info.monit) throw new Error('No monitoring data')
    if (!info.pm2_env) throw new Error('No PM2 Env data')

    return {
      cpuUsage: info.monit.cpu!,
      id: info.pm_id!,
      metadata: {
        // @ts-ignore
        createdAt: info.pm2_env.created_at,
        execPath: info.pm2_env.pm_exec_path!,
        interpreter: info.pm2_env.exec_interpreter!,
        // @ts-ignore
        namespace: info.pm2_env.namespace,
        // @ts-ignore
        version: info.pm2_env.node_version
      },
      name: info.name!,
      ramUsage: info.monit.memory!,
      restarts: info.pm2_env.unstable_restarts!,
      status: (
        {
          online: ProcessStatus.Online,
          errored: ProcessStatus.Errored,
          launching: ProcessStatus.Launching,
          stopped: ProcessStatus.Stopped,
          stopping: ProcessStatus.Stopping,
          'one-launch-status': ProcessStatus.OneLaunchStatus
        } as {
          [key in Required<
            Required<ProcessDescription>['pm2_env']
          >['status']]: ProcessStatus
        }
      )[info.pm2_env.status!],
      startedDate: info.pm2_env.pm_uptime!
    }
  }

  private setupInterval() {
    setInterval(() => {
      pm2.list((error, list) => {
        if (!error) {
          const processes = list.map((process) =>
            this.translateProcess(process)
          )

          for (const process of processes) {
            if (this.processes.some((p) => p.id === process.id)) {
              this.emit('PROCESS_UPDATED', process)
            } else {
              this.emit('PROCESS_CREATED', process)
            }
          }

          for (const existingProcess of this.processes) {
            if (!processes.some((x) => x.id === existingProcess.id))
              this.emit('PROCESS_DELETE', { id: existingProcess.id })
          }

          this.processes = processes
        }
      })
    }, this.interval)
  }
}
