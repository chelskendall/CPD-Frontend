import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cpd } from 'src/app/cpd/cpd.model';
import { CpdService } from 'src/app/cpd/cpd.service';


@Component({
  selector: 'app-cpd-add',
  templateUrl: './cpd-add.component.html',
  styleUrls: ['./cpd-add.component.css']
})

export class CpdAddComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  typeArray: any = ['On-Job-Training', 'Work experience', 'Self-study', 'Seminars/Lectures', 'Workshops', 'Other'];
  
  fileArr = [];
  imgArr = [];
  fileObj = [];
  msg: string;
  progress: number = 0;
  @ViewChild('resetCpdForm') myNgForm: any;

  cpdForm: FormGroup;
  email: string | null | undefined;


  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  constructor(public CpdService: CpdService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private sanitizer: DomSanitizer,
              ) 
    { this.cpdForm = this.formBuilder.group({
      typeCPD: ['', [Validators.required]],
      cpdTitle: ['', [Validators.required]],
      cpdDescribe: ['', [Validators.required]],
      cpdStart: ['', [Validators.required]],
      cpdEnd: ['', [Validators.required]],
      cpdHours: ['', [Validators.required]],
      cpdReflect: ['', [Validators.required]],
      files: [null],
    }); 
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.cpdForm.controls[controlName].hasError(errorName);
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
    this.cpdForm.patchValue({
      files: this.fileObj,
    });

    this.cpdForm.get('files').updateValueAndValidity();

    // Upload to server
    this.CpdService
      .addFiles(this.cpdForm.value.files)
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

  /* Submit affiliation */
  onSubmit() {
    if (this.cpdForm.valid) {
    this.CpdService.addCpd( 
      this.cpdForm.value.typeCPD, 
      this.cpdForm.value.cpdTitle,
      this.cpdForm.value.cpdDescribe,
      this.cpdForm.value.cpdStart,
      this.cpdForm.value.cpdEnd,
      this.cpdForm.value.cpdHours,
      this.cpdForm.value.cpdReflect,)
      .subscribe((res) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/cpd-list'));
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
