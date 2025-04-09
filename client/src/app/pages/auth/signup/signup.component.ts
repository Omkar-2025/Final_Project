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


  registerInputControl=[
    {name:'name',label:'Name',type:'text'},
    {name:'email',label:'Email',type:'text'},
    {name:'password',label:'Password',type:'password'},
    {name:'confirmPassowrd',label:'Confirm Password',type:'password'},
    {name:'phone',label:'Phone',type:'text'}
  ]
  btnName:string='Register';

  constructor(private authService:AuthService,private messageService:MessageService,private router:Router){

    this.registerForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      name:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      confirmPassowrd:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      phone:new FormControl( '' ,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.maxLength(10),Validators.minLength(10)])
    })

  }

  register(registerCredentials:{name:string,email:string,password:string,confirmPassowrd:string,phone:string}){
    if(registerCredentials.name=='' || registerCredentials.email=='' || registerCredentials.password=='' || registerCredentials.confirmPassowrd=='' || !registerCredentials.phone){

      this.messageService.add({severity:'error',summary:'Error',detail:'Please fill all the fields'});
      
      return;
    }

    if(registerCredentials.password!=registerCredentials.confirmPassowrd){
      this.messageService.add({severity:'error',summary:'Error',detail:'Password and Confirm Password should be same'})
      return;
    }

    registerCredentials.confirmPassowrd = registerCredentials.password;

    this.authService.signup(registerCredentials).subscribe((data:any)=>{

      this.messageService.add({severity:'success',summary:'Success',detail:data.msg});

      this.authService.userAuthSubject.next(this.registerForm.value.email);

      this.router.navigate(['/otp']);

    },(error)=>{
      console.log(error);

      this.messageService.add({severity:'success',summary:'Success',detail:error.message});

    })
    
  }


}
