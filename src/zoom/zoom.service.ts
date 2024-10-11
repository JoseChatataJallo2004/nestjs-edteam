import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ZoomService {

    private users:{ [key: string]: string}={};

      setUsers(data: {user:string}, client: Socket) {
        this.users[client.id] = data.user; 
      }
    handleDisconnect(client: Socket) {
      console.log('client activo', client.id);
      }
      handleConnection(client: Socket) {
        console.log('client des', client.id);
    }
}
