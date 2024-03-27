import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmploymentService } from 'src/app/employment/employment.service';


@Component({
  selector: 'app-employment-add',
  templateUrl: './employment-add.component.html',
  styleUrls: ['./employment-add.component.css'],
})


export class EmploymentAddComponent implements OnInit {

  @ViewChild('resetEmploymentForm') myNgForm: any;

  employmentForm: FormGroup;
  email: string | null | undefined;

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  constructor(private EmploymentService: EmploymentService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              ) 
    { this.employmentForm = this.formBuilder.group({
      jobTitle: ['', [Validators.required]],
      employer: ['', [Validators.required]],
      employStart: ['', [Validators.required]],
      employEnd: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
    }); 
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.employmentForm.controls[controlName].hasError(errorName);
  };

  /* Submit employment */
  onSubmit() {
    if (this.employmentForm.valid) {
    this.EmploymentService.addEmployment(this.employmentForm.value).subscribe(
      (res) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/employment-list'));
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


