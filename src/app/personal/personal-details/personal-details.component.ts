import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Personal } from 'src/app/personal/personal.model';
import { PersonalService } from 'src/app/personal/personal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})

export class PersonalDetailsComponent implements OnInit {

  /*@Input() viewMode = false;

  @Input() currentPersonal: Personal = {
    firstName: '',
    lastName: '',
    phone: undefined,
    emailAddress: '',
    mailAddress: '',
    statement: ''
  };
  
  message = '';*/

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
        phone: [''],
        emailAddress: [''],
        mailAddress: [''],
        statement: ['']
      })
    }

/*  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPersonal(this.route.snapshot.params["id"]);
    }
  }

  getPersonal(id: string): void {
    this.PersonalService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPersonal = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      firstName: this.currentPersonal.firstName,
      lastName: this.currentPersonal.lastName,
      phone: this.currentPersonal.phone,
      emailAddress: this.currentPersonal.emailAddress,
      mailAddress: this.currentPersonal.mailAddress,
      statement: this.currentPersonal.statement
    };

    this.message = '';

    this.PersonalService.update(this.currentPersonal.firstName, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'The section was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updatePersonal(): void {
    this.message = '';

    this.PersonalService.update(this.currentPersonal.firstName, this.currentPersonal)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This section was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
 
  deletePersonal(): void {
    this.PersonalService.delete(this.currentPersonal.firstName)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/personals']);
        },
        error: (e) => console.error(e)
      });
  }*/

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
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

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
