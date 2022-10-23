import EventEmitter from 'events'
import { WebSocket } from './WebSocket'

import { ProcessAction, ProcessInfo } from '@pm2-dash/typings'

export class API {
  static processListener = new EventEmitter()
  static ws = new WebSocket(this)

  static storedProcesses: {
    [key: number]: ProcessInfo
  } = {}

  static async executeAction(processId: number, action: ProcessAction) {
    return await fetch(`/api/processes/${processId}/action`, {
      method: 'POST',
      body: JSON.stringify({ action }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((x) => x.json())
  }
}
