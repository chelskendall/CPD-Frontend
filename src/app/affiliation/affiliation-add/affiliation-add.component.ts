import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Affiliation } from 'src/app/affiliation/affiliation.model';
import { AffiliationService } from 'src/app/affiliation/affiliation.service';


@Component({
  selector: 'app-affiliation-add',
  templateUrl: './affiliation-add.component.html',
  styleUrls: ['./affiliation-add.component.css']
})

export class AffiliationAddComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  typeArray: any = ['Membership', 'Certificate', 'Award', 'Grant', 'Other'];
  
  fileArr = [];
  imgArr = [];
  fileObj = [];
  msg: string;
  progress: number = 0;
  @ViewChild('resetAffiliationForm') myNgForm: any;

  affiliationForm: FormGroup;
  email: string | null | undefined;


  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  constructor(public AffiliationService: AffiliationService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private sanitizer: DomSanitizer,
              ) 
    { this.affiliationForm = this.formBuilder.group({
      typeAffiliation: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      affiliateTitle: ['', [Validators.required]],
      affiliateStart: ['', [Validators.required]],
      affiliateEnd: ['', [Validators.required]],
      files: [null],
    }); 
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.affiliationForm.controls[controlName].hasError(errorName);
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
    this.affiliationForm.patchValue({
      files: this.fileObj,
    });

    this.affiliationForm.get('files').updateValueAndValidity();

    // Upload to server
    this.AffiliationService
      .addFiles(this.affiliationForm.value.files)
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
    if (this.affiliationForm.valid) {
    this.AffiliationService.addAffiliation( 
      this.affiliationForm.value.typeAffiliation, 
      this.affiliationForm.value.organization,
      this.affiliationForm.value.affiliateTitle,
      this.affiliationForm.value.affiliateStart,
      this.affiliationForm.value.affiliateEnd,)
      .subscribe((res) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/affiliation-list'));
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
