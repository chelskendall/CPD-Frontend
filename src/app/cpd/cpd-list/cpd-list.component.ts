import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cpd } from 'src/app/cpd/cpd.model';
import { CpdService } from 'src/app/cpd/cpd.service';

@Component({
  selector: 'app-cpd-list',
  templateUrl: './cpd-list.component.html',
  styleUrls: ['./cpd-list.component.css']
})

export class CpdListComponent implements OnInit {

  Cpds: any = [];
  email: string | null | undefined;

  constructor(
    private CpdService: CpdService,
    private router: Router) {
      this.CpdService.getCpdList().subscribe((data: any) => {
      this.Cpds = data.data;
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
      this.CpdService.deleteCpd(id).subscribe((data: any) => {
        this.Cpds.splice(i, 1);
      });
    }
  }

  navigateToCpdAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'cpd-add']);
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
