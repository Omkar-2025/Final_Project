import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
email: string = '';
emailError: string = '';
otpValue: string = '';
otpError: string = '';

forgetPasswordForm!:FormGroup;

constructor(private authService:AuthService,private messageService:MessageService ,private router:Router){
  this.forgetPasswordForm = new FormGroup({
    password:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })
}

forgetPasswordInputControls=[
 
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
]

sendResetLink() {
  if (!this.email ) {
    this.emailError = 'Please enter a valid email address.';
    return;
  }
  this.emailError = '';
  console.log('Reset link sent to:', this.email);
}

showOtpDialog: boolean = false;

showForgetPasswordDialog: boolean = false;

showEmailInput: boolean = true;

btnName:string = 'forgetPassword';

sendOtp(){
    this.authService.resendOtp(this.email).subscribe((res:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:res.msg});
      this.showOtpDialog = true;
      this.showEmailInput = false;
    },(error)=>{
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg});
      return;
    })
}

verifyOtp() {

  this.authService.forgetOtp(this.email,this.otpValue).subscribe((res:any) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Otp verified Sucessfully" });
    this.showOtpDialog = false;
    this.showForgetPasswordDialog = true;
    this.showEmailInput = false;
  },
  (error:any)=>{
    this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg});
  })
  
  this.showForgetPasswordDialog=true;

}

forgetPassword(value:any){

  this.authService.forgetPassword({ email: this.email, password: value.password , otp:this.otpValue }).subscribe((res:any)=>{
    this.messageService.add({severity:'success',summary:'Success',detail:res.msg});
    this.showForgetPasswordDialog = false;
    this.showOtpDialog = false;
    this.showEmailInput = false;
    this.router.navigate(['/login']);
  },(error)=>{
    this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg});
    return;
  })

}

}
