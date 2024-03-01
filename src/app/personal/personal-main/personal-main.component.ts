import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/personal/personal.model';
import { PersonalService } from 'src/app/personal/personal.service';

@Component({
  selector: 'app-personal-main',
  templateUrl: './personal-main.component.html',
  styleUrls: ['./personal-main.component.css']
})
export class PersonalMainComponent implements OnInit {

  email: string | null | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  navigateToPersonal() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/personal', email]);
  }

  navigateToPersonalAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'personal-add']);
  }
 
  navigateToPersonalList() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'personal-list']);
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
