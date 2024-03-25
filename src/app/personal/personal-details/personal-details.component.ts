import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Personal } from 'src/app/personal/personal.model';
import { PersonalService } from 'src/app/personal/personal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
}) 

export class PersonalDetailsComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  email: string | null | undefined;

  constructor(
    private PersonalService: PersonalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private ngZone: NgZone) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.PersonalService.getPersonal(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        phone: data.data.phone,
        emailAddress: data.data.emailAddress,
        mailAddress: data.data.mailAddress,
        statement: data.data.statement
        });
      });
      this.updateForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        emailAddress: ['', [Validators.email]],
        mailAddress: [''],
        statement: ['']
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

  onUpdate(): any {
    this.PersonalService.updatePersonal(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user/:email/personal-list'))
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
