import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Affiliation } from 'src/app/affiliation/affiliation.model';
import { AffiliationService } from 'src/app/affiliation/affiliation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-affiliation-details',
  templateUrl: './affiliation-details.component.html',
  styleUrls: ['./affiliation-details.component.css']
})

export class AffiliationDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  email: string | null | undefined;

  constructor(
    private AffiliationService: AffiliationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.AffiliationService.getAffiliation(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        typeAffiliation: data.data.typeAffiliation,
        organization: data.data.organization,
        affiliateTitle: data.data.affiliateTitle,
        affiliateStart: [data.data.affiliateStart, [Validators.required]],
        affiliateEnd: [data.data.affiliateEnd, [Validators.required]],
        });
      });
      this.updateForm = this.formBuilder.group({
        typeAffiliation: [''],
        organization: [''],
        affiliateTitle: [''],
        affiliateStart: ['', [Validators.required]],
        affiliateEnd: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.updateForm.controls[controlName].hasError(errorName);
  };

  onUpdate(): any {
    this.AffiliationService.updateAffiliation(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/affiliation-list'))
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
