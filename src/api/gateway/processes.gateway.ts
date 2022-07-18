import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { PM2Service } from '../services/pm2.service'

import { EventsToServer, EventsFromServer } from '@pm2-dash/typings'

@WebSocketGateway({ path: '/ws', pingInterval: 45e3 })
export class ProcessesGateway implements OnGatewayConnection {
  constructor(private readonly pm2: PM2Service) {
    pm2.on('PROCESS_UPDATED', (p) => {
      this.server.emit('PROCESS_UPDATE', p)
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
    this.pm2.processes.forEach((process) => {
      client.emit('PROCESS_CREATE', process)
    })
  }

  @SubscribeMessage('LOGS_SUBSCRIBE')
  balls() {}
}
