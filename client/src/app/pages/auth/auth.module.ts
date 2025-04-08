import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp'; 
import { FormsModule } from '@angular/forms';
import { HomeModule } from "../home/home.module";
import { SharedModule } from "../../shared/shared.module";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MessageModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ProgressSpinnerModule,
    RouterModule,
    InputOtpModule,
    HomeModule,
    SharedModule
],
  exports: [
    LoginComponent,
    SignupComponent,
    OtpComponent
  ],
  providers: [
    MessageService,
    ConfirmationService 
  ]
})
export class AuthModule { }