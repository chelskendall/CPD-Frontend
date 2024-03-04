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

  
    // Get Academics
    getAcademic() { 
      const email = localStorage.getItem('theUser');
      const headers = {'Authorization': `Bearer ${this.token}`};
      return this.http.get(`${this.baseUrl}/allacademic`);}
    
    // Create Academic
    addAcademic(establishment: string,
                courseTitle: string,
                academicStart: string,
                academicEnd: string,
                newfile: File): 
        Observable<any> {
        const email = localStorage.getItem('theUser');
        const headers = {'Authorization': `Bearer ${this.token}`};
      
      var formData: any = new FormData();
      formData.append('establishment', establishment);
      formData.append('courseTitle', courseTitle);
      formData.append('academicStart', academicStart);
      formData.append('academicEnd', academicEnd);
      formData.append('files', newfile);
      return this.http.post<Academic>(`${this.baseUrl}/newacademic`, formData,  {
        headers,
        reportProgress: true,
        observe: 'events',
      }).pipe(catchError(this.handleError));
    }

    //add new academic
  addAca(data: Academic): Observable<any> {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post(`${this.baseUrl}/newacademic`, data, { headers })
    .pipe(catchError(this.handleError));
  }


    // Error handling
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
