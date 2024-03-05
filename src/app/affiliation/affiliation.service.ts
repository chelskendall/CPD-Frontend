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

   //add files
   addFiles(images: File) {
    var arr = []
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item, i) => {
      formData.append('files', arr[0][i]);
    })

    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post(`${this.baseUrl}/newaffiliation`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    )
  }
   
  //Create new Affiliation
  addAffiliation(typeAffiliation: string,
    organization: string,
    affiliateTitle: string,
    affiliateStart: Date, 
    affiliateEnd: Date,): 
    
    Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};

    var formData: any = new FormData();
    formData.append('typeAffiliation', typeAffiliation);
    formData.append('organization', organization);
    formData.append('affiliateTitle', affiliateTitle);
    formData.append('affiliateStart', affiliateStart);
    formData.append('affiliateEnd', affiliateEnd);

    return this.http.post(`${this.baseUrl}/newaffiliation`, formData, { headers })
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
