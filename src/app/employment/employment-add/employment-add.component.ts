import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employment } from 'src/app/employment/employment.model';
import { EmploymentService } from 'src/app/employment/employment.service';

import {ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-employment-add',
  templateUrl: './employment-add.component.html',
  styleUrls: ['./employment-add.component.css']
})

export class EmploymentAddComponent implements OnInit {

  employmentForm: FormGroup;
  email: string | null | undefined;

  constructor(private EmploymentService: EmploymentService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone) 
    {
      this.employmentForm = this.formBuilder.group({
        jobTitle: [''],
        employer: [''],
        employStart: [''],
        employEnd: [''],
        responsibilities: [''],
        files: ['']
      });
    }

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  onSubmit(): any {
    this.EmploymentService.addEmployment(this.employmentForm.value).subscribe(
      (res: any) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/employment-list'));
      },
      (err: any) => {
        console.log(err);
      }
    );
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
