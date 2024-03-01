import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})


export class HomeUserComponent implements OnInit{
  panelOpenState = false;
  content?: string;
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

  navigateToUserProfile() {
    const email = localStorage.getItem('theUser');
    if (email == 'Administrator'){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['usersinfo', email]);
    }
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

  ngOnDestroy(){}

}

/*
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div #emailElement></div>
  `
})
export class AppComponent {
  @ViewChild('emailElement') emailElement: ElementRef;

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    if (email) {
      this.emailElement.nativeElement.textContent = email;
    }
    if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
      alert("Session Expired. Login again")
    }
  }
}
*/