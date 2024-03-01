import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employment } from '../employment/employment.model';
import  axios  from 'axios';


@Injectable({
  providedIn: 'root'
})

export class EmploymentService {
  
  baseUrl = 'http://localhost:3000/user/:email';
  private token: string | null;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
   }

   
  //add new employment
  addEmployment(data: Employment): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post(`${this.baseUrl}/newemploy`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all employment - list
  getEmploymentList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allemploy`, { headers });
  }

  //get one employment
  getEmployment(id: any): Observable<Employment> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Employment>(`${this.baseUrl}/employ/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update employment
  updateEmployment(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updateemploy/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete employment
  deleteEmployment(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deleteemploy/${id}`, { headers })
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

  findByTitle(title: any): Observable<Employment[]> {
    return this.http.get<Employment[]>(`${this.baseUrl}?title=${title}`);
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
