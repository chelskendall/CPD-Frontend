import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Affiliation } from 'src/app/affiliation/affiliation.model';
import { AffiliationService } from 'src/app/affiliation/affiliation.service';

@Component({
  selector: 'app-affiliation-add',
  templateUrl: './affiliation-add.component.html',
  styleUrls: ['./affiliation-add.component.css']
})

export class AffiliationAddComponent {

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

  constructor(private AffiliationService: AffiliationService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              ) 
    { this.affiliationForm = this.formBuilder.group({
      typeAffiliation: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      affiliateTitle: ['', [Validators.required]],
      affiliateStart: ['', [Validators.required]],
      affiliateEnd: ['', [Validators.required]],
      files: [''],
    }); 
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.affiliationForm.controls[controlName].hasError(errorName);
  };

  /* Submit affiliation */
  onSubmit() {
    if (this.affiliationForm.valid) {
    this.AffiliationService.addAffiliation(this.affiliationForm.value).subscribe(
      (res) => {
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
