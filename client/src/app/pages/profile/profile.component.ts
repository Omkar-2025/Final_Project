import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
showDialog() {
throw new Error('Method not implemented.');
}
sendResponse() {
throw new Error('Method not implemented.');
}
reply: any;


visible: boolean = false;

userData:any={};


updateUserInfoForm!: FormGroup;
updateUserPasswordForm:FormGroup;

constructor(private authService:AuthService , private messageService:MessageService , private accountService:AccountService){
  // this.updateUserInfoForm =  
  this.updateUserInfoForm = new FormGroup({
    name:new FormControl(this.userData.name,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    email:new FormControl(this.userData.email,[Validators.required,Validators.email]),
    phone:new FormControl(this.userData.phone,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    // password:new FormControl('',[Validators.required]),
    // confirmPassword:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required ,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })

  this.updateUserPasswordForm = new FormGroup({
    oldPassword:new FormControl('',[Validators.required]),
    newPassword:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
  })

}
    

  fetchUserInfo(){
    this.authService.getUser().subscribe((result:any)=>{
      this.userData=result.msg;
      // console.log(this.userData);
      this.updateUserInfoForm.patchValue({
        name:this.userData.name,
        email:this.userData.email,
        phone:this.userData.phone,
        address:this.userData.address
      })
    },(err:any)=>{
      console.log(err);
    })
  }


  fetchExpnensePdf(){
    this.accountService.getExpensePdf().subscribe((result)=>{
        console.log(result);
    },( err:any )=>{
      console.log(err);
    })
  } 


  downloadExpense(){
    this.fetchExpnensePdf();
    this.messageService.add({severity:'success',summary:'Success',detail:'Expense PDF Downloaded'})
  }


  ngOnInit(){
    this.fetchUserInfo();
  }


  updateProfileDialog(){
    this.visible=true;
  }

  updatePasswordVisible:boolean=false;
  updatePasswordDialog(){
    this.updatePasswordVisible=true;
  }

  updateUserInfo(){
  
    if(!this.updateUserInfoForm.valid){
      console.log('Form is invalid');
      this.messageService.add({severity:'error',summary:'Error',detail:'Form is Invalid'})
      return;
    }
    this.authService.updateUser(this.updateUserInfoForm.value).subscribe((result:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:result.msg})
      this.visible=false;
      this.fetchUserInfo();
    },(error:any)=>{
      console.log(error);
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg})
    })
  }


  updatePassword()
  {
    if(!this.updateUserPasswordForm.valid){
      console.log('Form is invalid');
      this.messageService.add({severity:'error',summary:'Error',detail:'Form is Invalid'})
      return;
    }
    if(this.updateUserPasswordForm.value.newPassword != this.updateUserPasswordForm.value.confirmPassword){
      this.messageService.add({severity:'error',summary:'Error',detail:'New Password and Confirm Password do not match'})
      return;
    }
    this.authService.updateUserPassword(this.updateUserPasswordForm.value).subscribe((result:any)=>{
      this.messageService.add({severity:'success',summary:'Success',detail:result.msg})
      this.updatePasswordVisible=false;
    },(error:any)=>{
      console.log(error);
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.msg})
    })
  }

}
