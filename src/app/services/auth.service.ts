import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model'
import { Router } from '@angular/router';
import  axios  from 'axios';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  errorMessage = new EventEmitter<string>();
  Response = new EventEmitter<[]>();  

  private users: User[] = [];
  private usersAdd = new Subject<User[]>();

  private token: string | null;  

  constructor(
    private http: HttpClient, 
    private router: Router,) 
    { 
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  }

  addUserdb(email: string, password: string, passwordConfirmation: string){
    const user: User = {email: email, password: password, passwordConfirmation: passwordConfirmation};
       localStorage.setItem('theUser', email);

       this.http.post<{message: string,token: string}>("http://localhost:3000/register", user).subscribe(
         (response) => {
           this.users.push(user);
           this.usersAdd.next([...this.users]);
           localStorage.setItem('token', response.token);
           this.router.navigate(['', email]);
         },
         error => {
           if (error.status === 409) {
             this.errorMessage.emit(error.error.message);
           }
         } 
       );
  }

  logindb(email: string, password: string,){
    const passon = {email: email, password: password};
    
    this.http.post<{token: string}>("http://localhost:3000/login", passon).subscribe(
         (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('theUser', email);
          if (email != 'Administrator' || 'Mentor'){
            this.router.navigate(['', email]);
          }else if (email == 'Administrator' || 'Mentor'){    
            this.getListUsers();         
            this.router.navigate(['', email]);
          }
         },
         error => {
           if (error.status === 400) {
             this.errorMessage.emit(error.error.message);
           }
           if (error.status === 404) {
            this.errorMessage.emit(error.error.message);
          }
         }
       ); 
  }

  passwordResetdb(email: string, password: string, passwordConfirmation: string){
    const passon = {email: email, password: password, passwordConfirmation: passwordConfirmation};

       this.http.put<{token: string}>("http://localhost:3000/users", passon).subscribe(
         (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('theUser', email);
          this.router.navigate(['', email]);
         },
         error => {
           if (error.status === 401) {
             this.errorMessage.emit(error.error.message);
           }
         }
       );
  }

  getUserInfo(){
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    this.http.get<{profiles: []}>(("http://localhost:3000/usersinfo/"+email),{ headers })
    .subscribe(messageData => {
      this.Response.emit(messageData.profiles);
    }); 
  }

  getUserInfoAdmin(email: string){
    const headers = {'Authorization': `Bearer ${this.token}`};
    this.http.get<{profiles: []}>(("http://localhost:3000/usersinfo/"+email),{ headers })
    .subscribe(messageData => {
      this.Response.emit(messageData.profiles);
    }); 
  }

  getListUsers(){
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    console.log("http://localhost:3000/"+email)
    this.http.get<{email: []}>(("http://localhost:3000/users/"+email),{ headers })
    .subscribe(messageData => {
      this.Response.emit(messageData.email);
    }); 
  }

  //Admin only
  deletedb(email: string){
    const headers = {'Authorization': `Bearer ${this.token}`};
    const options = {
      body: { email: email }
    };
    this.http.delete<{}>("http://localhost:3000/users/Administrator", { headers, ...options }).subscribe(
      () => {
        location.reload()
      },
      (error) => {
        if (error.status === 401) {
          alert(error.error.message);
        }
      }
    );
  }

  getUsersUpdateListner(){
    return this.usersAdd.asObservable();
  }

}
