import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { loginInterface } from '../../../types/user';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  
  loginForm:FormGroup;

  forgetPassword:boolean=false;

  loginInputControl=[
    {name:'email',label:'Email',type:'text'},
    {name:'password',label:'Password',type:'password'}
  ]

  btnName:string='Login';
  fromType:string='login';


  constructor(private authService:AuthService,private messageService:MessageService,private router:Router) {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })
  }



  login(loginCredentials:loginInterface){
    if(loginCredentials.email=='' || loginCredentials.password==''){
      this.messageService.add({severity:'error',summary:'Error',detail:'Please fill all the fields'});
      return;
    }

    this.authService.login(loginCredentials).subscribe((res:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:res.msg});
      localStorage.setItem('token',JSON.stringify(true));
      localStorage.setItem('role',res.role);
      this.authService.isloggedInSubject.next(true);
      this.authService.userRole.next(res.role);
      this.router.navigate(['/home']);
    },
    (error)=>{
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg});
      return;
    })
  }


  
  
}
