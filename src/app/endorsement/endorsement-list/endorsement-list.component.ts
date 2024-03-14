import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endorsement } from 'src/app/endorsement/endorsement.model';
import { EndorsementService } from 'src/app/endorsement/endorsement.service';

@Component({
  selector: 'app-endorsement-list',
  templateUrl: './endorsement-list.component.html',
  styleUrls: ['./endorsement-list.component.css']
})

export class EndorsementListComponent implements OnInit {

  Endorsements: any = [];
  email: string | null | undefined;

  constructor(
    private EndorsementService: EndorsementService,
    private router: Router) {
      this.EndorsementService.getEndorsementList().subscribe((data: any) => {
      this.Endorsements = data.data;
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
      this.EndorsementService.deleteEndorsement(id).subscribe((data: any) => {
        this.Endorsements.splice(i, 1);
      });
    }
  }

  navigateToEndorsementAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'endorsement-add']);
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
