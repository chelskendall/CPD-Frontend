import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Personal } from 'src/app/personal/personal.model';
import { PersonalService } from 'src/app/personal/personal.service';

@Component({
  selector: 'app-personal-add',
  templateUrl: './personal-add.component.html',
  styleUrls: ['./personal-add.component.css']
})

export class PersonalAddComponent implements OnInit {

  personalForm: FormGroup;
  email: string | null | undefined;

  constructor(private PersonalService: PersonalService,
              public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone) 
    {
      this.personalForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        emailAddress: ['', [Validators.email]],
        mailAddress: [''],
        statement: ['']
      }); 
    }

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  /*savePersonal(): void {
    const data = {
      firstName: this.personal.firstName,
      lastName: this.personal.lastName,
      phone: this.personal.phone,
      emailAddress: this.personal.emailAddress,
      mailAddress: this.personal.mailAddress,
      statement: this.personal.statement
    };

    this.PersonalService.addPersonal(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPersonal(): void {
    this.submitted = false;
    this.personal = {
    firstName: '',
    lastName: '',
    phone: undefined,
    emailAddress: '',
    mailAddress: '',
    statement: ''
    };
  }*/

  onSubmit(): any {
    this.PersonalService.addPersonal(this.personalForm.value).subscribe(
      (res: any) => {
        console.log('Added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/personal-list'));
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
