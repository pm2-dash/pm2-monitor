export enum ProcessStatus {
  Online,
  Stopping,
  Launching,
  Errored,
  OneLaunchStatus,
  Stopped
}

export interface ProcessMetadata {
  version?: string
  execPath: string
  createdAt: number
  interpreter: string
  logPath: string
}

export interface ProcessInfo {
  name: string
  id: number
  status: ProcessStatus
  ramUsage: number
  cpuUsage: number
  startedDate: number
  restarts: number
  namespace: string
  metadata: ProcessMetadata
}

export enum ProcessAction {
  Stop,
  Restart,
  Start,
  Delete
}

export interface ActionBody {
  action: ProcessAction
}
