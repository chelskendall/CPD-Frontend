import { Component, OnInit } from '@angular/core';
import { AcademicService } from "src/app/academic/academic.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-academic-list',
  templateUrl: './academic-list.component.html',
  styleUrls: ['./academic-list.component.css']
})

export class AcademicListComponent implements OnInit {

Academics: any = [];
email: string | null | undefined;

constructor(public AcademicService: AcademicService,
              public router: Router,) {
    this.AcademicService.getAcademicList().subscribe((data: any) => {
    this.Academics = data.data;
    console.log(data);
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

  delete(id: any, i: any) {
    if (window.confirm('Are you sure?')) {
      this.AcademicService.deleteAcademic(id).subscribe((data: any) => {
        this.Academics.splice(i, 1);
      });
    }
  }

  navigateToAcademicAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'academic-add']);
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
