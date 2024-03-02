import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employment } from 'src/app/employment/employment.model';
import { EmploymentService } from 'src/app/employment/employment.service';

/* Verbose datepicker
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
*/


@Component({
  selector: 'app-employment-add',
  templateUrl: './employment-add.component.html',
  styleUrls: ['./employment-add.component.css'],
  providers: [     
    //{ provide: MomentDateAdapter, useValue: MY_FORMATS }
  ],
})


export class EmploymentAddComponent implements OnInit {

  @ViewChild('resetEmploymentForm') myNgForm: any;

  employmentForm: FormGroup;
  email: string | null | undefined;
  //employStart = new FormControl(moment());

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
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
      files: [''],
    }); 
  }

  /*Date
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.employmentForm.get('employStart').setValue(convertDate, {
      onlyself: true,
    });
  }
  dateRange = new FormGroup({
    employStart: new FormControl(),
    employEnd: new FormControl()
  });*/

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


