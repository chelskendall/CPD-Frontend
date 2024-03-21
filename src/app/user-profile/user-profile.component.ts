import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit{
  
  @ViewChild('htmlData') htmlData!: ElementRef;
  Response: Array<any>;

  constructor(public AuthService: AuthService, private router: Router) { 
    this.AuthService.Response.subscribe(profiles =>{
      this.Response = profiles;
    });
  }  

  ngOnInit(): void {
    const email = localStorage.getItem('theUser');
    const emailAdmin = localStorage.getItem('theUserAdmin');
    if (email != 'Administrator'){
      this.AuthService.getUserInfo();
      document.getElementById('email-value').innerHTML = email; 
    }else if(email == 'Administrator'){
      this.AuthService.getUserInfoAdmin(emailAdmin);
      document.getElementById('email-value').innerHTML = emailAdmin;      
    }
  }

  //download CV template
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'letter');  //new jsPDF() object and define the PDF size in it
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('cv-template.pdf'); //takes the downloaded PDF’s name as an argument
    });
  }

  navigateToHomepage() {
    const email = localStorage.getItem('theUser');
    this.router.navigate(['', email]);
  }

  logout(){
    localStorage.removeItem('theUser');
    localStorage.removeItem('theUserAdmin');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnDestroy(){
  }


}
