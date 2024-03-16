import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  
  socket;
  constructor() { }

  // Handle message receive event
  subscribeToMessages = (cb) => {
    this.socket.on('message', msg => {
      console.log('Room event received!');
      return cb(null, msg);
    });
  }

  sendMessage = ({message, roomName}, cb) => {
   if (this.socket) this.socket.emit('message', { message, roomName }, cb);
  }

  joinRoom = (roomName) => {
    this.socket.emit('join', roomName);
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }  

}
