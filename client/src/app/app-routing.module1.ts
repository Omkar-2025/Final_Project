import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { AccountComponent } from './component/account/account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { BillsComponent } from './pages/bills/bills.component';
import { SupportComponent } from './pages/support/support.component';
import { DashboardComponent  } from './pages/admin/dashboard/dashboard.component';
import { AdminRoutingModule } from './pages/admin/admin-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { AuthguradService } from './guard/authgurad.service';
import { AdminguradService } from './guard/admingurad.service';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:SignupComponent},
  {path:'otp',component:OtpComponent},
  {path:'account/:id',component:AccountComponent,canActivate:[AuthguradService]},
  {path:'createaccount',component:CreateAccountComponent,canActivate:[AuthguradService]},
  {path:'bills',component:BillsComponent,canActivate:[AuthguradService]},
  {path:'support',component:SupportComponent,canActivate:[AuthguradService]},
  {path:'admin',component:DashboardComponent,canActivate:[AdminguradService]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthguradService]},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'forget',component:ForgetPasswordComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
