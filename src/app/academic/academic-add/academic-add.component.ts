import { Component, OnInit, NgZone } from '@angular/core';
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
  
  email: string | null | undefined;
  preview!: string;
  academicForm: FormGroup;
  percentDone: any = 0;
  academics = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public AcademicService: AcademicService,
    private ngZone: NgZone,
  ) {
    // Reactive Form
    this.academicForm = this.fb.group({
      establishment: new FormControl('', [Validators.required]),
      courseTitle: new FormControl('', [Validators.required]),
      academicStart: new FormControl('', [Validators.required]),
      academicEnd: new FormControl('', [Validators.required]),
      files: [null]
    })
  }

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }

    this.AcademicService.addAcademic(
      this.academicForm.value.establishment,
      this.academicForm.value.courseTitle,
      this.academicForm.value.academicStart,
      this.academicForm.value.academicEnd,
      this.academicForm.value.files).subscribe(
      (res) => {
        console.log('Added successfully!' + res);
        this.router.navigate(['/user/:email/academic-list'])
        //this.ngZone.run(() => this.router.navigateByUrl('/user/:email/employment-list'));
      },
      (err: any) => {
        console.log(err);
      });

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

/*  submitForm() {
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
          console.log('Academic successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['/user/:email/academic-list'])
      }
    })
  }*/

  onSubmitA() {
    if (this.academicForm.valid) {
      this.AcademicService.addAca(this.academicForm.value).subscribe(
        (res) => {
          console.log('Added successfully!' + res);
          this.ngZone.run(() => this.router.navigateByUrl('/user/:email/academic-list'));
        },
        (err: any) => {
          console.log(err);
        });
      }
  }

  /* Submit academics */
  onSubmit() {
    this.AcademicService.addAcademic(
      this.academicForm.value.establishment,
      this.academicForm.value.courseTitle,
      this.academicForm.value.academicStart,
      this.academicForm.value.academicEnd,
      this.academicForm.value.files).subscribe(
      (res) => {
        console.log('Added successfully!' + res);
        this.router.navigate(['/user/:email/academic-list'])
        //this.ngZone.run(() => this.router.navigateByUrl('/user/:email/employment-list'));
      },
      (err: any) => {
        console.log(err);
      });
  }

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
