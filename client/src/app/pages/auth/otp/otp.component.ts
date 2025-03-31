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

  constructor(private messageService:MessageService,private authService:AuthService,private router:Router){

  }

  validateOtp(){
    // if(this.value.length!=4){
    //   this.messageService.add({severity:'error',summary:'Error',detail:'Please enter a valid OTP'})
    //   return;
    // } 
    console.log(this.value);
    this.authService.verifyUser({otp:this.value}).subscribe((data:any)=>{
      console.log(data);
      this.messageService.add({severity:'success',summary:'Success',detail:data.msg});
      this.router.navigate(['/login']);
    },(error)=>{
      console.log(error);
      this.messageService.add({severity:'error',summary:'Error',detail:error});
    })
  }

}
