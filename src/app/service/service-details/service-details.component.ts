import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Service } from 'src/app/service/service.model';
import { ServiceService } from 'src/app/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  email: string | null | undefined;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  typeArray: any = ['Lecture', 'Article/Book/Report', 'Project', 'Community Activity', 'Other'];
  
  fileArr = [];
  imgArr = [];
  fileObj = [];
  msg: string;
  progress: number = 0;

  constructor(
    public ServiceService: ServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
    ) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.ServiceService.getService(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        typeServices: [data.data.typeServices, [Validators.required]],
        serviceTitle: data.data.serviceTitle,
        serviceDescribe: data.data.serviceDescribe,
        serviceDate: [data.data.serviceDate, [Validators.required]],
        serviceNotes: data.data.serviceNotes,
        });
      });
      this.updateForm = this.formBuilder.group({
        typeServices: ['', [Validators.required]],
        serviceTitle: ['', [Validators.required]],
        serviceDescribe: ['', [Validators.required]],
        serviceDate: ['', [Validators.required]],
        serviceNotes: ['', [Validators.required]],
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
    this.ServiceService
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
    this.ServiceService.updateService(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/service-list'))
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
