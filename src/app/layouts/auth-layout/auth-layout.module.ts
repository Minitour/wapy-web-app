import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatButtonModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule { }
