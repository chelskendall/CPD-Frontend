import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './material.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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

/*ng g s services/tutorial
ng g c components/add-tutorial
ng g c components/tutorial-details
ng g c components/tutorials-list
ng g class models/tutorial --type=model*/


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeUserComponent,
    PersonalMainComponent,
    PersonalAddComponent,
    PersonalDetailsComponent,
    PersonalListComponent,
    EmploymentMainComponent,
    EmploymentAddComponent,
    EmploymentDetailsComponent,
    EmploymentListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: ':email', component: HomeUserComponent},

      {path: 'personal/:email', component: PersonalMainComponent},
      {path: 'user/:email/personal-add', component: PersonalAddComponent},
      {path: 'user/:email/personal-details/:id', component: PersonalDetailsComponent},
      {path: 'user/:email/personal-list', component: PersonalListComponent},

      {path: 'employment/:email', component: EmploymentMainComponent},
      {path: 'user/:email/employment-add', component: EmploymentAddComponent},
      {path: 'user/:email/employment-details/:id', component: EmploymentDetailsComponent},
      {path: 'user/:email/employment-list', component: EmploymentListComponent},
    ])
  ],
  providers: [MessageService, ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
