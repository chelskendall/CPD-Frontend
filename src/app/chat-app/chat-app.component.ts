import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatMessage } from './chat-message.model';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})

export class ChatAppComponent implements OnInit {

  /* https://deadsimplechat.com/blog/angular-chat-application-with-socket-io-and-node-js/
  
  constructor(private messageService: MessagesService) {}

  //initialize model with a new Chat Message
  model = new ChatMessage("");
  
  //create array for msgs to be received 
  messageList: string[] = [];    //*TBD - store in database?

  //send msgs to users
  sendMessage(): void {
    console.log(this.model.msg)
    this.messageService.sendMessage(this.model.msg)
    this.model.msg = "";
   };

  ngOnInit(): void {
    this.messageService.getMessage().subscribe((message:string)=> {
      this.messageList.push(message);
    })
  }

  submitted = false;

  onSubmit() { 
    this.sendMessage()
    this.submitted = true;
  }
  */

  /* https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs
  
  const SENDER = {
  id: "123",
  name: "John Doe",
};

  CHAT_ROOM = "myRandomChatRoomId";

  messages = [];

  tokenForm = this.formBuilder.group({
    token: '',
  });

  messageForm = this.formBuilder.group({
    message: '',
  });

  constructor(
    private socketService: MessagesService,
    private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    //this.socketService.setupSocketConnection();
  }

  submitMessage() {
    const message = this.messageForm.get('message').value;
    if (message) {
      this.socketService.sendMessage({message, roomName: this.CHAT_ROOM}, cb => {
        console.log("ACKNOWLEDGEMENT ", cb);
      });
      this.messages = [
        ...this.messages,
        {
          message,
          ...SENDER,
        },
      ];
      // clear the input after the message is sent
      this.messageForm.reset();
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
*/

  email: string | null | undefined;  
  public newMessage: string = '';
  public messageList: any = [];

  constructor(
    private MessagesService: MessagesService,
    private router: Router){  }

  ngOnInit(): void{
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
    this.listMessages();
  }

  sendMessage() {
    this.MessagesService.sendMessage(this.newMessage);
    this.messageList.push(this.newMessage);
    this.newMessage = '';
  }

  listMessages() {
    this.MessagesService.listMessages().subscribe((data: any) => {
      console.log(data);
      this.messageList.push(data.data);
    });
  }

  navigateToPersonal() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/personal', email]);
  }

  navigateToEmployment() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/employment', email]);
  }

  navigateToAcademic() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/academic', email]);
  }

  navigateToAffiliation() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/affiliation', email]);
  }

  navigateToService() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/service', email]);
  }

  navigateToCPD() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/cpd', email]);
  }
  
  navigateToEndorsement() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/endorsement', email]);
  }

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
