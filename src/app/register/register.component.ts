import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model'
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  errorMessage: string | undefined;
  
   constructor(
    public AuthService: AuthService, 
    private router: Router,
    ) 
  { 
    this.AuthService.errorMessage.subscribe(message => {
      this.errorMessage = message;
      alert(message)
    });
  }

  private usersSub: Subscription;

  users: User[] = [];

  addUser(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    const passwordConfirmation = target.querySelector('#passwordConfirmation').value

    if (!email || !password || !passwordConfirmation
      || email.trim() === '' || password.trim() === '' || passwordConfirmation.trim() === '') {
        alert("Fill in ALL fields"); } 
      else {
    this.AuthService.addUserdb(email, password, passwordConfirmation)
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.usersSub = this.AuthService.getUsersUpdateListner().subscribe((users: User[])=>{
      this.users = users;
    })
  }

  ngOnDestroy(){
    this.usersSub.unsubscribe();
  }

}
