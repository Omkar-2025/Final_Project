import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  createAccountForm: FormGroup;
  accountTypes = [
      { label: 'Current Account', value: 'Current Account' },
      { label: 'Salary Account', value: 'Salary Account' },
      {label:'Savings Account',value:'Savings Account'}
  ];

  constructor(private accountService:AccountService, private messageService:MessageService , private router:Router) {
      this.createAccountForm = new FormGroup({
          name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
          amount:new FormControl(500,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
          accountType:new FormControl('Current Account',[Validators.required]),
      });
  }

  createAccount() {
      if (!this.createAccountForm.valid) {
           this.messageService.add({severity:'error', summary:'Error', detail:'Please enter all the fields'});
          return;   
      }
      this.accountService.createAccount(this.createAccountForm.value.name,this.createAccountForm.value.amount,this.createAccountForm.value.accountType).subscribe((result:any)=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'Account created successfully'});
          this.createAccountForm.reset();
      },(error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Error creating account'});
          return ;
      })
      this.router.navigate(['/home']);
  }

  

}
