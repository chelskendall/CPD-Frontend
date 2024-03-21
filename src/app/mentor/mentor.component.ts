import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})

export class MentorComponent implements OnInit{

  Response: Array<any>;

  constructor(public AuthService: AuthService, private router: Router) { 
    this.AuthService.Response.subscribe(email =>{
      this.Response = email;
    });
  }  

  navigateToUserInfo(email: string): void {
    localStorage.setItem('theUserAdmin', email);
    this.router.navigate(['/usersinfo', email]);
  }

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    this.AuthService.getListUsers();
  }

  navigateToHomepage() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['', email]);
  }

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnDestroy(){
  }


}
