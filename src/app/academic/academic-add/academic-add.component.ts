import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AcademicService } from "src/app/academic/academic.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-add',
  templateUrl: './academic-add.component.html',
  styleUrls: ['./academic-add.component.css']
})

export class AcademicAddComponent implements OnInit {
  
  fileArr = [];
  imgArr = [];
  fileObj = [];
  msg: string;
  progress: number = 0;
  @ViewChild('resetAcademicForm') myNgForm: any;

  academicForm: FormGroup;
  email: string | null | undefined;

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
    public AcademicService: AcademicService
  ) {
    this.academicForm = this.formBuilder.group({
      establishment: ['', [Validators.required]],
      courseTitle: ['', [Validators.required]],
      academicStart: ['', [Validators.required]],
      academicEnd: ['', [Validators.required]],
      files: [null],
    });
  } 

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.academicForm.controls[controlName].hasError(errorName);
  };

  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = e as HTMLInputElement;
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    });

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });

    // Set files form control
    this.academicForm.patchValue({
      files: this.fileObj,
    });

    this.academicForm.get('files').updateValueAndValidity();

    // Upload to server
    this.AcademicService
      .addFiles(this.academicForm.value.files)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = 'File uploaded successfully!';
            }, 3000);
        }
      });
  }
 
  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /* Submit academic */
  onSubmit() {
    if (this.academicForm.valid) {
    this.AcademicService.addAcademic(
      this.academicForm.value.establishment,
      this.academicForm.value.courseTitle,
      this.academicForm.value.academicStart,
      this.academicForm.value.academicEnd,)
      .subscribe((res) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/academic-list'));
      },
      (err: any) => {
        console.log(err); 
      });
    }
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
