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

   // Create Academic
  addAcademic(
    establishment: string,
    courseTitle: string,
    academicStart: Date,
    academicEnd: Date,
    files: File): Observable<any> {
    
    var formData: any = new FormData();
    
    formData.append('establishment', establishment);
    formData.append('courseTitle', courseTitle);
    formData.append('academicStart', academicStart);
    formData.append('academicEnd', academicEnd);
    formData.append('files', files);

    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.post<Academic>(`${this.baseUrl}/newacademic`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Get Academic
  getAcademic() {
    const email = localStorage.getItem('theUser');
    const headers = {'Authorization': `Bearer ${this.token}`};
    return this.http.get(`${this.baseUrl}/allacademic`);
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
