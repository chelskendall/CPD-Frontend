import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affiliation } from 'src/app/affiliation/affiliation.model';
import { AffiliationService } from 'src/app/affiliation/affiliation.service';

@Component({
  selector: 'app-affiliation-list',
  templateUrl: './affiliation-list.component.html',
  styleUrls: ['./affiliation-list.component.css']
})

export class AffiliationListComponent {

  Affiliations: any = [];
  email: string | null | undefined;

  constructor(
    private AffiliationService: AffiliationService,
    private router: Router) {
      this.AffiliationService.getAffiliationList().subscribe((data: any) => {
      this.Affiliations = data.data;
      console.log(data);
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

  delete(id: any, i: any) {
    if (window.confirm('Are you sure?')) {
      this.AffiliationService.deleteAffiliation(id).subscribe((data: any) => {
        this.Affiliations.splice(i, 1);
      });
    }
  }

  navigateToAffiliationAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'affiliation-add']);
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
