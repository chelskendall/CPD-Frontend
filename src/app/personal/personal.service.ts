import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Personal } from '../personal/personal.model';
import  axios  from 'axios';


@Injectable({
  providedIn: 'root'
})

export class PersonalService {
  baseUrl = 'http://localhost:3000/user/:email';
  private token: string | null;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
   }

  //add new personal
  addPersonal(data: Personal): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post(`${this.baseUrl}/newpersonal`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all personals - list
  getPersonalList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allpersonal`, { headers });
  }

  //get one personal
  getPersonal(id: any): Observable<Personal> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Personal>(`${this.baseUrl}/personal/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update personal
  updatePersonal(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updatepersonal/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete personal
  deletePersonal(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deletepersonal/${id}`, { headers })
    .pipe(catchError(this.handleError));
  }

  deleteAll(): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(this.baseUrl);
  }

  uploadPhoto(photo: any) {
    return this.http.post(this.baseUrl + '/savefile', photo);
  }

  findByTitle(title: any): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.baseUrl}?title=${title}`);
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
    // Handle client error
      errorMessage = error.error.message;
      } else {
    // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
          console.log(errorMessage);
          return throwError(() => {
          errorMessage;
          });
  }

}
