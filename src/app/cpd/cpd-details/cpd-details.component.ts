import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Cpd } from 'src/app/cpd/cpd.model';
import { CpdService } from 'src/app/cpd/cpd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cpd-details',
  templateUrl: './cpd-details.component.html',
  styleUrls: ['./cpd-details.component.css']
})

export class CpdDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  email: string | null | undefined;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  typeArray: any = ['On-Job-Training', 'Work experience', 'Self-study', 'Seminars/Lectures', 'Workshops', 'Other'];
  fileArr = [];
  imgArr = [];
  fileObj = [];
  msg: string;
  progress: number = 0;

  constructor(
    public CpdService: CpdService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
    ) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.CpdService.getCpd(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        typeCPD: [data.data.typeCPD, [Validators.required]],
        cpdTitle: data.data.cpdTitle,
        cpdDescribe: data.data.cpdDescribe,
        cpdStart: [data.data.cpdStart, [Validators.required]],
        cpdEnd: [data.data.cpdEnd, [Validators.required]],
        cpdHours: data.data.cpdHours,
        cpdReflect: data.data.cpdReflect,
        });
      });
      this.updateForm = this.formBuilder.group({
        typeCPD: ['', [Validators.required]],
        cpdTitle: [''],
        cpdDescribe: [''],
        cpdStart: ['', [Validators.required]],
        cpdEnd: ['', [Validators.required]],
        cpdHours: [''],
        cpdReflect: [''],
      })
    }

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.updateForm.controls[controlName].hasError(errorName);
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
    this.updateForm.patchValue({
      files: this.fileObj,
    });

    this.updateForm.get('files').updateValueAndValidity();

    // Upload to server
    this.CpdService
      .addFiles(this.updateForm.value.files)
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

  onUpdate(): any {
    this.CpdService.updateCpd(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/cpd-list'))
      }, (err) => {
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
