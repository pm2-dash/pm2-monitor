import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { ProcessService } from '../services/process.service'

import { EventsToServer, EventsFromServer } from '@pm2-dash/typings'

@WebSocketGateway({ path: '/ws', pingInterval: 45e3 })
export class ProcessesGateway implements OnGatewayConnection {
  constructor(private readonly processes: ProcessService) {
    processes.on('PROCESS_UPDATED', (p) => {
      this.server.emit('PROCESS_UPDATE', p)
    })
    processes.on('PROCESS_CREATED', (p) => {
      this.server.emit('PROCESS_CREATE', p)
    })
    processes.on('PROCESS_DELETE', (p) => {
      this.server.emit('PROCESS_DELETE', p)
    })
  }

  @WebSocketServer()
  server: Server<
    {
      [key in keyof EventsToServer]: (val: EventsToServer[key]) => void
    },
    {
      [key in keyof EventsFromServer]: (val: EventsFromServer[key]) => void
    }
  >

  handleConnection(client: this['server']) {
    this.processes.processes.forEach((process) => {
      client.emit('PROCESS_CREATE', process)
    })
  }
}
