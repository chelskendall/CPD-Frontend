import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Affiliation } from '../affiliation/affiliation.model';
import  axios  from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AffiliationService {

  baseUrl = 'http://localhost:3000/user/:email';
  private token: string | null;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
   }

   
  //add new Affiliation
  addAffiliation(data: Affiliation): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post(`${this.baseUrl}/newaffiliation`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all Affiliation - list
  getAffiliationList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allaffiliation`, { headers });
  }

  //get one Affiliation
  getAffiliation(id: any): Observable<Affiliation> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Affiliation>(`${this.baseUrl}/affiliation/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update Affiliation
  updateAffiliation(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updateaffiliation/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete Affiliation
  deleteAffiliation(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deleteaffiliation/${id}`, { headers })
    .pipe(catchError(this.handleError));
  }

  deleteAll(): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(this.baseUrl);
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
