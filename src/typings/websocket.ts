import { ProcessInfo } from './api'

export interface EventsFromServer {
  PROCESS_CREATE: ProcessInfo
  PROCESS_UPDATE: ProcessInfo
  PROCESS_DELETE: { id: number }
}

export interface EventsToServer {
  LOGS_SUBSCRIBE: { id: string }
}
