import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  
  id=0;
  account:any;
  transcations:any;
  visible: boolean = false;
  amount = 0;
  type:string='';
  account_number='';
  transactionType='';
  accounts: { name: string, balance: number, account_type: string, id: number, account_number: string }[] = [];
  isSelectAccount: any = false;
  selectedAccounts:any=''
  
  constructor(private router:ActivatedRoute,private accountService:AccountService , private messageService:MessageService){}
  
  selectAccount() {
    this.isSelectAccount = true;
  }


  ngOnInit(){
      this.router.params.subscribe((params)=>{
        this.id=params['id'];
      })
      this.accountService.getaccountById(this.id).subscribe((result:any)=>{
        this.account=result[0];
      })

      this.accountService.getTransactionsByAccount(this.id).subscribe((result:any)=>{
        console.log(result);
        console.log(this.id);
        this.transcations=result;
      })

  }

  showDialog(type:string) {
    this.type = type;
    this.visible = true;

    this.accountService.getAllBankAccounts().subscribe((result:any)=>{
      this.accounts = result;
      // console.log(result);
      // console.log(this.accounts);
      this.isSelectAccount = true;
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching accounts'});
    })

  }

  DepositAmount(){
    if(this.amount <= 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid amount'});
      return;
    }
    this.accountService.depositAmount(this.id,this.amount).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Amount Deposited Successfully'});
      this.visible = false;
      this.ngOnInit();
    })
  }

  withdrawAmount(){ 
    if(this.amount <= 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid amount'});
      return;
    }
    if(this.amount > this.account.balance){
      this.messageService.add({severity:'error', summary:'Error', detail:'Insufficient Balance'});
      return;
    }
    this.accountService.withdrawAmount(this.id,this.amount).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Amount Withdrawn Successfully'});
      this.visible = false;
      this.ngOnInit();
    })
    this.visible = false;
  }

  transferAmount(){

    if(this.account_number == this.account.account_number){
      this.messageService.add({severity:'error', summary:'Error', detail:'Cannot transfer to same account'});
      return;
    }

    if(this.account_number == ''){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid account number'});
      return;
    }

    

    if(this.amount <= 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid amount'});
      return;
    }
    if(this.amount > this.account.balance){
      this.messageService.add({severity:'error', summary:'Error', detail:'Insufficient Balance'});
      return;
    }
    if(this.account_number == ''){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid account number'});
      return;
    }
    this.accountService.transferAmount(this.id,this.account_number,this.amount, this.transactionType).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Amount Transferred Successfully'});
      this.visible = false;
      this.ngOnInit();
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Invalid Account Number'});
    })
    this.visible = false;

   
  }

  }
