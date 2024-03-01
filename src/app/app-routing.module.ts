import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeUserComponent } from './home-user/home-user.component';

import { PersonalMainComponent } from './personal/personal-main/personal-main.component';
import { PersonalAddComponent } from './personal/personal-add/personal-add.component';
import { PersonalDetailsComponent } from './personal/personal-details/personal-details.component';
import { PersonalListComponent } from './personal/personal-list/personal-list.component';

import { EmploymentMainComponent } from './employment/employment-main/employment-main.component';
import { EmploymentAddComponent } from './employment/employment-add/employment-add.component';
import { EmploymentDetailsComponent } from './employment/employment-details/employment-details.component';
import { EmploymentListComponent } from './employment/employment-list/employment-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':email', component: HomeUserComponent },

  {path: 'personal/:email', component: PersonalMainComponent},
  {path: 'user/:email/personal-add', component: PersonalAddComponent},
  {path: 'user/:email/personal-details/:id', component: PersonalDetailsComponent},
  {path: 'user/:email/personal-list', component: PersonalListComponent},

  {path: 'employment/:email', component: EmploymentMainComponent},
  {path: 'user/:email/employment-add', component: EmploymentAddComponent},
  {path: 'user/:email/employment-details/:id', component: EmploymentDetailsComponent},
  {path: 'user/:email/employment-list', component: EmploymentListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
