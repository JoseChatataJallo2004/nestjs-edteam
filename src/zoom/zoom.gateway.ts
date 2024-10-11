import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ZoomService } from './zoom.service';

@WebSocketGateway({cors:true})
export class ZoomGateway implements OnGatewayConnection , OnGatewayDisconnect {
  constructor(private readonly zoomService: ZoomService) {}

  @WebSocketServer() server:Server;

  @SubscribeMessage('msg')
  handleEvent(
    @MessageBody() data:{user:string},
    @ConnectedSocket() client:Socket,
  ):void{
     this.zoomService.setUsers(data,client);
     this.server.emit('msgToClient', data);
  }

  async handleDisconnect(client: Socket) {
    this.zoomService.handleConnection(client);
  }
  async handleConnection(client: Socket) {
    this.zoomService.handleDisconnect(client);
  }
}
