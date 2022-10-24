import { ProcessInfo } from './api'

export interface EventsFromServer {
  PROCESS_CREATE: ProcessInfo
  PROCESS_UPDATE: ProcessInfo
  PROCESS_DELETE: { id: number }
  LOGS_UNSUBSCRIBED: void
  LOG: string
}

export interface EventsToServer {
  LOGS_SUBSCRIBE: { id: number }
  LOGS_UNSUBSCRIBE: void
}
