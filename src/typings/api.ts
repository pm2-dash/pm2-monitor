export enum ProcessStatus {
  Online,
  Stopping,
  Launching,
  Errored,
  OneLaunchStatus,
  Stopped
}

export interface ProcessMetadata {
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
  uptime: number
  metadata: ProcessMetadata
}
