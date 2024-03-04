import { Component, OnInit } from '@angular/core';
import { AcademicService } from "src/app/academic/academic.service";
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-academic-list',
  templateUrl: './academic-list.component.html',
  styleUrls: ['./academic-list.component.css']
})

export class AcademicListComponent implements OnInit {

email: string | null | undefined;


Academic: any = [];
  constructor(public AcademicService: AcademicService,
              public router: Router,) {
    this.getAcademic();
  }

ngOnInit(): void {
    /*const email = localStorage.getItem('theUser');
    document.getElementById("email-value").innerHTML = email;*/
    this.email = localStorage.getItem('theUser');
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }

  getAcademic() {
    this.AcademicService.getAcademic().subscribe((res) => {
      this.Academic = res['academics'];
    })
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
