import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

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

  isLoading:boolean = false;


  depositFormGroup = new FormGroup({
    amount:new FormControl(0,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.min(100),Validators.max(10000)]),
  })

  inputAmount=[{name:'amount',label:'Amount',type:'number'}];
  Deposit:string='Deposit';

  isTranscationCompleted:boolean = false;

   

  transferFromgroup!:FormGroup;

  search:string = ''



  transferFromInputControl = [{name:'Account_Number',label:'Account_Number',type:'text'},{name:'Amount',label:'Amount',type:'number'},{name:'Description',label:'Description',type:'text'}]

  constructor(private router:ActivatedRoute,private accountService:AccountService , private messageService:MessageService){
    this.transferFromgroup = new FormGroup({
      Account_Number:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      Amount:new FormControl(0,[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.min(500),Validators.max(10000)]),
      Description:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    })
  }
  
  selectAccount() {
    this.isSelectAccount = true;
  }

  fetchTranscations(id:number,pageNumber:number=1)
  {
    
    this.accountService.getaccountById(this.id).subscribe((result:any)=>{
      this.account=result[0];
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:error.error.msg});
    })

    this.accountService.getTransactionsByAccount(this.id,pageNumber).subscribe((result:any)=>{
      this.transcations=result;
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:error.error.msg});
    })
  }

  ngOnInit(){
    this.router.params.subscribe((params)=>{
      this.id=params['id'];
    })

    this.fetchTranscations(this.id);
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

  DepositAmount(val:any){
    // console.log(val);
    this.isTranscationCompleted = true;
    this.isLoading=true;
    this.visible= false;
    this.amount = val.amount;
    if(this.amount <= 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid amount'});
      this.isTranscationCompleted=false;
      this.visible = false;
      this.ngOnInit();
      return;
    }
    this.accountService.depositAmount(this.id,this.amount).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Amount Deposited Successfully'});
      this.visible = false;
      this.isTranscationCompleted=false;
      this.isLoading=false;
      this.ngOnInit();
      // val.target.disabled = true;
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:error.error.msg});
      this.isLoading=false;
      this.visible=false;
      this.ngOnInit();
    })
  }

  withdrawAmount(val:any){ 
 
    this.isTranscationCompleted = true;
    this.amount =val.amount
    this.isLoading=true;
    if(this.amount <= 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a valid amount'});
      return;
    }
    if(this.amount > val.amount){
      this.messageService.add({severity:'error', summary:'Error', detail:'Insufficient Balance'});
      return;
    }
    this.accountService.withdrawAmount(this.id,this.amount).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Amount Withdrawn Successfully'});
      this.visible = false;
      this.isLoading=false;
      this.ngOnInit();
    },(error)=>{
      this.messageService.add({severity:'error',summary:'Error',detail:error.error.message})
      this.isLoading=false;
      this.visible=false;
      this.ngOnInit()
    })
    this.visible = false;
  }

  transferAmount(val:any){

    // this.ngOnInit();
    this.isTranscationCompleted = true;

    console.log(val);

    this.account_number = val.Account_Number;
    this.transactionType = val.Description;
    this.amount  = val.Amount;
    this.isLoading=true;

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
    if(this.amount >val.Amount){
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
      this.isLoading=false;
      this.ngOnInit();
    },(error)=>{
      // console.log(error);
      this.isLoading=false;
      this.messageService.add({severity:'error', summary:'Error', detail:error.error.msg});
    })
    this.visible = false;
  }

  deactiveAccount(event:any){
    this.isLoading=true;
    event.target.disabled = true;
    this.accountService.deactivateAccount(this.id).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Account Deactivated Successfully'});
      this.ngOnInit();
      this.isLoading=false;
    },(error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Error Deactivating Account'});
    })
  }

  activeAccount(event:any){
    event.target.disabled =true;
    this.isLoading=true;
      this.accountService.activateAccount(this.id).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Account Activated Successfully'});
      this.ngOnInit();
      this.isLoading=false;
      },( error )=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Error Activating Account'});
      })
  }


  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 10;
      console.log(event.first, event.rows);
    // console.log(event.first!/10);
      const pageNumber = event.first!/10 + 1;
      this.fetchTranscations(this.id,pageNumber) 
  }

  searchText(){
      this.accountService.searchTransaction(this.id,this.search).subscribe((result:any)=>{
        this.transcations = result.msg
        
      },
    (error)=>{
      this.messageService.add({severity:'error',summary:'error',detail:'Bill payment not fonud '})
    })


   if(!this.search){
    // console.log(this.search); 
    this.fetchTranscations(this.id,0);
   }

  }

  }
