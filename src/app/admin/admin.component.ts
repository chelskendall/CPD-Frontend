import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

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

  delete(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#delete').value

    if (email == 'Administrator'){
      alert('You can not delete the Administrator')
    } else{
      this.AuthService.deletedb(email)
    }    
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
