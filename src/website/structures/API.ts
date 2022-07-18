import EventEmitter from 'events'
import { WebSocket } from './WebSocket'

import { ProcessInfo } from '@pm2-dash/typings'

export class API {
  static processListener = new EventEmitter()
  static ws = new WebSocket(this)

  static storedProcesses: {
    [key: number]: ProcessInfo
  } = {}
}
