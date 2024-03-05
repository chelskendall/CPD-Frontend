import { Component, OnInit, NgZone } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "src/app/academic/academic.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-add',
  templateUrl: './academic-add.component.html',
  styleUrls: ['./academic-add.component.css']
})

export class AcademicAddComponent implements OnInit {
  
  preview: string;
  academicForm: FormGroup;
  percentDone: any = 0;
  academics = [];
  email: string | null | undefined;

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public AcademicService: AcademicService
  ) {
    // Reactive Form
    this.academicForm = this.fb.group({
      establishment: [''],
      courseTitle: [''],
      academicStart: ['', [Validators.required]],
      academicEnd: ['', [Validators.required]],
      files: [null],
    })
  } 

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.academicForm.patchValue({
      files: file
    });
    this.academicForm.get('files').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    this.AcademicService.addAcademic(
      this.academicForm.value.establishment,
      this.academicForm.value.courseTitle,
      this.academicForm.value.academicStart,
      this.academicForm.value.academicEnd,
      this.academicForm.value.files
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['/user/:email/academic-list'])
      }
    })
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.academicForm.controls[controlName].hasError(errorName);
  };

  navigateToPersonal() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/personal', email]);
  }

  navigateToEmployment() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/employment', email]);
  }

  navigateToAcademic() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/academic', email]);
  }

  navigateToAffiliation() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/affiliation', email]);
  }

  navigateToService() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/service', email]);
  }

  navigateToCPD() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/cpd', email]);
  }
  
  navigateToEndorsement() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/endorsement', email]);
  }

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }


}
