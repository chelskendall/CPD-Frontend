import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cpd } from '../cpd/cpd.model';
import  axios  from 'axios';

@Injectable({
  providedIn: 'root'
})

export class CpdService {

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
    return this.http.post(`${this.baseUrl}/newcpd`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    )
  }
   
  //Create new CPD
  addCpd(typeCPD: string,
    cpdTitle: string,
    cpdDescribe: string,
    cpdStart: Date, 
    cpdEnd: Date,
    cpdHours: number,
    cpdReflect: string,): 
    
    Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};

    var formData: any = new FormData();
    formData.append('typeCPD', typeCPD);
    formData.append('cpdTitle', cpdTitle);
    formData.append('cpdDescribe', cpdDescribe);
    formData.append('cpdStart', cpdStart);
    formData.append('cpdEnd', cpdEnd);
    formData.append('cpdHours', cpdHours);
    formData.append('cpdReflect', cpdReflect);

    return this.http.post(`${this.baseUrl}/newcpd`, formData, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all CPD - list
  getCpdList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allcpd`, { headers });
  }

  //get one CPD
  getCpd(id: any): Observable<Cpd> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Cpd>(`${this.baseUrl}/cpd/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update CPD
  updateCpd(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updatecpd/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete CPD
  deleteCpd(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deletecpd/${id}`, { headers })
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
