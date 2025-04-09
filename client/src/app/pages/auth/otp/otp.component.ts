import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  value : string = '';

  otpTime : number =180;

  constructor(private messageService:MessageService,private authService:AuthService,private router:Router){}

  ngOnInit(){
    if(this.otpTime>0){
    setInterval(() => {
      if(this.otpTime>0){
      this.otpTime = this.otpTime - 1;
      }
    },1000)
  }
  }


  validateOtp(){
    // if(this.value.length!=4){
    //   this.messageService.add({severity:'error',summary:'Error',detail:'Please enter a valid OTP'})
    //   return;
    // } 

    this.authService.verifyUser({otp:this.value}).subscribe((data:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:data.msg});
      this.router.navigate(['/login']);
    },(error)=>{
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.message});

    })
  }

  resendOtp(){

    this.authService.userAuth.subscribe((data:any)=>{
      this.authService.resendOtp({email:data}).subscribe((data:any)=>{
        this.messageService.add({severity:'success',summary:'Success',detail:data.msg});
      },(error:any)=>{
        this.messageService.add({severity:'error',summary:'Error',detail:error.error.message});
      })
    },(error:any)=>{
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.message});
    })

  }

}
