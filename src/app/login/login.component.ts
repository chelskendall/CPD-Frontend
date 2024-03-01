import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMessage!: string;

  constructor(
    public AuthService: AuthService,
    private router: Router
  ) 
    { this.AuthService.errorMessage.subscribe(message => {
    this.errorMessage = message;
    alert(message)
      }); 
    }

    login(event: { preventDefault: () => void; target: any; }){
      event.preventDefault()
      const target = event.target
      const email = target.querySelector('#email').value
      const password = target.querySelector('#password').value
  
      this.AuthService.logindb(email,password)
    }

    register(){
      this.router.navigate(['/register']);
    }
  
    gologin(){
      this.router.navigate(['/login']);
    }

  ngOnInit(): void {}
  
  ngOnDestroy(){}

}
