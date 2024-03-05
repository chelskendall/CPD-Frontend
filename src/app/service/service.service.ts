import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Service } from '../service/service.model';
import  axios  from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

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
    return this.http.post(`${this.baseUrl}/newservice`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    )
  }
   
  //Create new Service
  addService(typeServices: string,
    serviceTitle: string,
    serviceDescribe: string,
    serviceDate: Date, 
    serviceNotes: string,): 
    
    Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};

    var formData: any = new FormData();
    formData.append('typeServices', typeServices);
    formData.append('serviceTitle', serviceTitle);
    formData.append('serviceDescribe', serviceDescribe);
    formData.append('serviceDate', serviceDate);
    formData.append('serviceNotes', serviceNotes);

    return this.http.post(`${this.baseUrl}/newservice`, formData, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all Service - list
  getServiceList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allservice`, { headers });
  }

  //get one Service
  getService(id: any): Observable<Service> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Service>(`${this.baseUrl}/service/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update Service
  updateService(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updateservice/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete Service
  deleteService(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deleteservice/${id}`, { headers })
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
