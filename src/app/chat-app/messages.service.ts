import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer, BehaviorSubject, map} from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  /* https://deadsimplechat.com/blog/angular-chat-application-with-socket-io-and-node-js/

  constructor(private socket: Socket) { }
  //emits the msg event that is listening, to server with msg data that wants to broadcast
  sendMessage(msg:string){
    console.log(msg)
    this.socket.emit('message', msg);
  }

  //listens to the msg
  getMessage(){
  return  new Observable((observer: Observer<any>)=>{
      this.socket.on('message', (message:string)=>{
        observer.next(message)
      })
    })
  }
  */

  /* https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs
  socket;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  // Handle message receive event
  subscribeToMessages = (cb) => {
    if (!this.socket) return(true);
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
  */
  

  constructor(private socket: Socket) { }

  //youtube code
  public sendMessage(message: string) {
    this.socket.emit('private message', message);
  }

  public listMessages() {
    return this.socket.fromEvent('private message').pipe(map((data) => data));
  }

  public getUsers() {
    return this.socket.fromEvent('users').pipe(map((data: any) => data))
  }

  /* swag-coder
  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
*/

}
