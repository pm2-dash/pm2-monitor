import { EventsFromServer, EventsToServer } from '@pm2-dash/typings'
import EventEmitter from 'events'
import { io, Socket } from 'socket.io-client'
import { store } from '../store'
import {
  addProcess,
  clearProcesses,
  deleteProcess
} from '../store/reducers/processes.reducer'
import { API } from './API'

export class WebSocket {
  ws = io('', { path: '/ws', autoConnect: false }) as Socket<
    {
      [key in keyof EventsFromServer]: (val: EventsFromServer[key]) => void
    },
    {
      [key in keyof EventsToServer]: (val: EventsToServer[key]) => void
    }
  >

  constructor(api: typeof API) {
    this.ws.on('disconnect', () => {
      store.dispatch(clearProcesses())
    })
    this.ws.on('PROCESS_CREATE', (process) => {
      api.storedProcesses[process.id] = process
      store.dispatch(addProcess(process))
    })
    this.ws.on('PROCESS_UPDATE', (process) => {
      api.processListener.emit(`${process.id}`, process)
    })
    this.ws.on('PROCESS_DELETE', ({ id }) => {
      store.dispatch(deleteProcess(id))
    })

    if ('window' in global) {
      window.onload = () => {
        this.ws.connect()
      }
    }
  }
}
