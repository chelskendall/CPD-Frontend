import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { HomeUserComponent } from './home-user/home-user.component';

import { AdminComponent } from './admin/admin.component';

import { PersonalMainComponent } from './personal/personal-main/personal-main.component';
import { PersonalAddComponent } from './personal/personal-add/personal-add.component';
import { PersonalDetailsComponent } from './personal/personal-details/personal-details.component';
import { PersonalListComponent } from './personal/personal-list/personal-list.component';

import { EmploymentMainComponent } from './employment/employment-main/employment-main.component';
import { EmploymentAddComponent } from './employment/employment-add/employment-add.component';
import { EmploymentDetailsComponent } from './employment/employment-details/employment-details.component';
import { EmploymentListComponent } from './employment/employment-list/employment-list.component';

import { AcademicMainComponent } from './academic/academic-main/academic-main.component';
import { AcademicAddComponent } from './academic/academic-add/academic-add.component';
import { AcademicDetailsComponent } from './academic/academic-details/academic-details.component';
import { AcademicListComponent } from './academic/academic-list/academic-list.component';

import { AffiliationMainComponent } from './affiliation/affiliation-main/affiliation-main.component';
import { AffiliationAddComponent } from './affiliation/affiliation-add/affiliation-add.component';
import { AffiliationDetailsComponent } from './affiliation/affiliation-details/affiliation-details.component';
import { AffiliationListComponent } from './affiliation/affiliation-list/affiliation-list.component';

import { ServiceMainComponent } from './service/service-main/service-main.component';
import { ServiceAddComponent } from './service/service-add/service-add.component';
import { ServiceDetailsComponent } from './service/service-details/service-details.component';
import { ServiceListComponent } from './service/service-list/service-list.component';

import { CpdMainComponent } from './cpd/cpd-main/cpd-main.component';
import { CpdAddComponent } from './cpd/cpd-add/cpd-add.component';
import { CpdDetailsComponent } from './cpd/cpd-details/cpd-details.component';
import { CpdListComponent } from './cpd/cpd-list/cpd-list.component';

import { EndorsementMainComponent } from './endorsement/endorsement-main/endorsement-main.component';
import { EndorsementAddComponent } from './endorsement/endorsement-add/endorsement-add.component';
import { EndorsementDetailsComponent } from './endorsement/endorsement-details/endorsement-details.component';
import { EndorsementListComponent } from './endorsement/endorsement-list/endorsement-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: ResetPasswordComponent },
  { path: ':email', component: HomeUserComponent },
  {path: 'admin', component: AdminComponent},

  {path: 'personal/:email', component: PersonalMainComponent},
  {path: 'user/:email/personal-add', component: PersonalAddComponent},
  {path: 'user/:email/personal-details/:id', component: PersonalDetailsComponent},
  {path: 'user/:email/personal-list', component: PersonalListComponent},

  {path: 'employment/:email', component: EmploymentMainComponent},
  {path: 'user/:email/employment-add', component: EmploymentAddComponent},
  {path: 'user/:email/employment-details/:id', component: EmploymentDetailsComponent},
  {path: 'user/:email/employment-list', component: EmploymentListComponent},

  {path: 'academic/:email', component: AcademicMainComponent},
  {path: 'user/:email/academic-add', component: AcademicAddComponent},
  {path: 'user/:email/academic-details/:id', component: AcademicDetailsComponent},
  {path: 'user/:email/academic-list', component: AcademicListComponent},

  {path: 'affiliation/:email', component: AffiliationMainComponent},
  {path: 'user/:email/affiliation-add', component: AffiliationAddComponent},
  {path: 'user/:email/affiliation-details/:id', component: AffiliationDetailsComponent},
  {path: 'user/:email/affiliation-list', component: AffiliationListComponent},

  {path: 'service/:email', component: ServiceMainComponent},
  {path: 'user/:email/service-add', component: ServiceAddComponent},
  {path: 'user/:email/service-details/:id', component: ServiceDetailsComponent},
  {path: 'user/:email/service-list', component: ServiceListComponent},

  {path: 'cpd/:email', component: CpdMainComponent},
  {path: 'user/:email/cpd-add', component: CpdAddComponent},
  {path: 'user/:email/cpd-details/:id', component: CpdDetailsComponent},
  {path: 'user/:email/cpd-list', component: CpdListComponent},

  {path: 'endorsement/:email', component: EndorsementMainComponent},
  {path: 'user/:email/endorsement-add', component: EndorsementAddComponent},
  {path: 'user/:email/endorsement-details/:id', component: EndorsementDetailsComponent},
  {path: 'user/:email/endorsement-list', component: EndorsementListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
