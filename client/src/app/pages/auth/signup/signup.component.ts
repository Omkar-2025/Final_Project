import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { AuthService } from '../../../Services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registerForm:FormGroup;

  constructor(private authService:AuthService,private messageService:MessageService,private router:Router){

    this.registerForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      name:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      confirmPassowrd:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      phone:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })

  }

  register(){

    if(this.registerForm.value.password!=this.registerForm.value.confirmPassowrd){
      this.messageService.add({severity:'error',summary:'Error',detail:'Password and Confirm Password should be same'})
      return;
    }

    this.authService.signup(this.registerForm.value).subscribe((data:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:data.msg});
      this.authService.userAuthSubject.next(this.registerForm.value.email);
      this.router.navigate(['/otp']);
    },(error)=>{
      console.log(error);
      this.messageService.add({severity:'success',summary:'Success',detail:error});
    })
    
  }


}
