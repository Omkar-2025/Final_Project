import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillsService } from '../../Services/bills.service';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bills',
  standalone: false,
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {


  frequency_arr=[{name:'daily'},{name:'weekly'},{name:'monthly'}];
visible: any;
date: any;


  createBillForm: FormGroup;

  constructor(private billService:BillsService , private accountService:AccountService,private messageService:MessageService) {
   this.createBillForm = new FormGroup({
    billName: new FormControl('',[Validators.required]),
    amount:new FormControl(0,[Validators.required]),
    frequency:new FormControl('Monthly',[Validators.required]),
    account_id:new FormControl('',[Validators.required]),
   });
  }

  bills:any;
  billsTranscation:any;

  fetchBills(){
    this.billService.getBills().subscribe((result:any)=>{
      this.bills=result;
  },(error)=>{
    console.log(error);
  })
  this.billService.getbillshistory().subscribe((result:any)=>{
    this.billsTranscation=result;
    console.log(result);
  },(error)=>{
    console.log(error);
  })


  }

  ngOnInit() {
    this.fetchBills();
  }

  accounts:{name:string,balance:number,account_type:string,id:number,account_number:string}[]=[];
  selectedAccounts:any;
  isSelectAccount:boolean=false;
  isbillPayed:boolean=false;

  selectAccount(){
    this.isSelectAccount = true;
  }

  showDialog() {
    this.visible=true;
      this.accountService.getAllaccounts().subscribe((result:any)=>{
       //console.log(result[0].accounts); 
        this.accounts = result[0].accounts;
      },(error)=>{
         this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching accounts'});
      })
      // console.log(this.accounts);
  }

  createBill() {
    console.log(this.createBillForm.value);
    this.billService.createBill(this.createBillForm.value.billName ,this.createBillForm.value.amount , this.createBillForm.value.frequency , this.selectedAccounts.id).subscribe((result:any)=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Bill created successfully'});
      this.visible = false;
      this.ngOnInit();
    },(error)=>{
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error', detail:'Error creating bill'});
      return ;
    })
  }


  isBillUpdatedParent($event:any){
    console.log("Parent called");
    this.fetchBills();
  }
  isBillDeletedParent($event:any){
    console.log("Parent called");
    this.fetchBills();
  }
  
}
