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
      {name: 'Current Account', value: 'Current Account' },
      {name: 'Salary Account', value: 'Salary Account' },
      {name:'Savings Account',value:'Savings Account'}
  ];

  constructor(private accountService:AccountService, private messageService:MessageService , private router:Router) {
      this.createAccountForm = new FormGroup({
          name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(20)]),
          amount:new FormControl(500,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.min(500),Validators.max(10000)]),
          accountType:new FormControl('Current Account',[Validators.required]),
          panCardNumber:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),
Validators.maxLength(20)
          ]),
          aadharCardNumber:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),
Validators.maxLength(20)]),
        //   :new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),          
      });
  }

  createAccountInputControl = [
    { name: 'name', label: 'Account Name', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'accountType', label: 'AccountTypes ', type: 'select' },
    { name: 'panCardNumber', label: 'Pan Card Number', type: 'text' },
    { name: 'aadharCardNumber', label: 'Aadhar Card Number', type: 'text' }
  ];
  createBtnName:string='Create Account';



  createAccount() {
    // console.log(value);
    
      if (!this.createAccountForm.valid) {
           this.messageService.add({severity:'error', summary:'Error', detail:'Please enter all the fields'});
          return;   
      }
      this.accountService.createAccount(this.createAccountForm.value.name,this.createAccountForm.value.amount,this.createAccountForm.value.accountType,this.createAccountForm.value.aadharCardNumber,this.createAccountForm.value.panCardNumber).subscribe((result:any)=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'Account created successfully'});
          this.createAccountForm.reset();
      },(error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Error creating account'});
          return ;
      })
      this.router.navigate(['/home']);
  }

  

}
