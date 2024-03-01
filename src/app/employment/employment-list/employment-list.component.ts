import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employment } from 'src/app/employment/employment.model';
import { EmploymentService } from 'src/app/employment/employment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employment-list',
  templateUrl: './employment-list.component.html',
  styleUrls: ['./employment-list.component.css']
})

export class EmploymentListComponent implements OnInit {

  Employments: any = [];
  email: string | null | undefined;

  dataSource!: MatTableDataSource<Employment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'jobTitle',
    'employer',
    'employStart',
    'employEnd',
    'responsibilities',
  ];

  constructor(
    private EmploymentService: EmploymentService,
    private router: Router) {
      this.EmploymentService.getEmploymentList().subscribe((data) => {
      this.Employments = data;
      console.log(data);

      /*this.dataSource = new MatTableDataSource<Employment>(this.Employments);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);*/
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
      this.EmploymentService.deleteEmployment(id).subscribe((data: any) => {
        this.Employments.splice(i, 1);
      });
    }
  }

  navigateToEmploymentAdd() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['/user', email, 'employment-add']);
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
