import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  errorMessage: string;
  email: any;

  constructor(
    public AuthService: AuthService, 
    private router: Router) 
    { 
    this.AuthService.errorMessage.subscribe(message => {
      this.errorMessage = message;
      alert(this.errorMessage);
    });
  } 
 
  resetPassword(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#newPassword').value
    const passwordConfirmation = target.querySelector('#passwordConfirmation').value
    
    this.AuthService.passwordResetdb(email, password, passwordConfirmation)
  }

  register(){
    this.router.navigate(['/register']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

}
