import { Injectable } from '@angular/core';
import { Academic } from './academic.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import  axios  from 'axios';


@Injectable({
  providedIn: 'root'
})

export class AcademicService {

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
    return this.http.post(`${this.baseUrl}/newacademic`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    )
  }

   // Create new Academic
  addAcademic(establishment: string,
    courseTitle: string,
    academicStart: Date,
    academicEnd: Date,): 
    
    Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
     
    var formData: any = new FormData();
    formData.append('establishment', establishment);
    formData.append('courseTitle', courseTitle);
    formData.append('academicStart', academicStart);
    formData.append('academicEnd', academicEnd);
    
    return this.http.post(`${this.baseUrl}/newacademic`, formData, { headers })
    .pipe(catchError(this.handleError));
  }

  //get all Academic - list
  getAcademicList() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allacademic`, { headers });
  }

  //get one Academic
  getAcademic(id: any): Observable<Academic> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get<Academic>(`${this.baseUrl}/academic/${id}`, { headers })
    .pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //update Academic
  updateAcademic(id: any, data: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.put(`${this.baseUrl}/updateacademic/${id}`, data, { headers })
    .pipe(catchError(this.handleError));
  }

  //delete academic
  deleteAcademic(id: any): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.delete(`${this.baseUrl}/deleteacademic/${id}`, { headers })
    .pipe(catchError(this.handleError));
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
