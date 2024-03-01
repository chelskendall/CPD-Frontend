import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/personal/personal.model';
import { PersonalService } from 'src/app/personal/personal.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {

  Personals: any = [];
  email: string | null | undefined;

  constructor(
    private PersonalService: PersonalService,
    private router: Router) {
      this.PersonalService.getPersonalList().subscribe((data: any) => {
      this.Personals = data.data;
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
    if (window.confirm('Do you want to go ahead?')) {
      this.PersonalService.deletePersonal(id).subscribe((data: any) => {
        this.Personals.splice(i, 1);
      });
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

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
