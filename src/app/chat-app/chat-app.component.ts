import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})

export class ChatAppComponent implements OnInit {

  email: string | null | undefined;

  CHAT_ROOM = "myRandomChatRoomId";
  messages = [];
  messageForm = this.formBuilder.group({ message: '' });

  constructor(
    private formBuilder: FormBuilder,
    public MessagesService: MessagesService,
    private router: Router){ }
  
  ngOnInit(): void{
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  getMessage(){
    this.MessagesService.subscribeToMessages((err, data) => {
      console.log("new message ", data);
      this.messages = [...this.messages, data];
    });
  }

  submitMessage() {
    const message = this.messageForm.get('message').value;
    if (message) {
      this.MessagesService.sendMessage({message, roomName: this.CHAT_ROOM}, cb => {
        console.log("acknowledgement ", cb);
      });
      this.messages = [
        ...this.messages,
        {
          message,
        },
      ];
      // clear the input after the message is sent
      this.messageForm.reset();
    }
  }
  
  ngOnDestroy() {
    this.MessagesService.disconnect();
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
