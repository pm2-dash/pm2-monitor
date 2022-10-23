export enum ProcessStatus {
  Online,
  Stopping,
  Launching,
  Errored,
  OneLaunchStatus,
  Stopped
}

export interface ProcessMetadata {
  namespace: string
  version?: string
  execPath: string
  createdAt: number
  interpreter: string
}

export interface ProcessInfo {
  name: string
  id: number
  status: ProcessStatus
  ramUsage: number
  cpuUsage: number
  startedDate: number
  restarts: number
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
