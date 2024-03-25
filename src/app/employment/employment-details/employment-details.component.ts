import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Employment } from 'src/app/employment/employment.model';
import { EmploymentService } from 'src/app/employment/employment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css']
})

export class EmploymentDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  email: string | null | undefined;

  constructor(
    private EmploymentService: EmploymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.EmploymentService.getEmployment(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        jobTitle: data.data.jobTitle,
        employer: data.data.employer,
        employStart: data.data.employStart,
        employEnd: data.data.employEnd,
        responsibilities: data.data.responsibilities,
        });
      });
      this.updateForm = this.formBuilder.group({
        jobTitle: [''],
        employer: [''],
        employStart: ['', [Validators.required]],
        employEnd: ['', [Validators.required]],
        responsibilities: [''],
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

  onUpdate(): any {
    this.EmploymentService.updateEmployment(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/employment-list'))
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
