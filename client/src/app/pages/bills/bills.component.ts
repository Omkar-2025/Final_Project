import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillsService } from '../../Services/bills.service';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';
import { AccountType } from '../../types/account';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-bills',
  standalone: false,
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {


  visible: boolean=false;

  selectedAccounts!: any;

  bills: any;


  billsTranscation: any;


  billFrequencies = [{ name: 'daily' }, { name: 'weekly' }, { name: 'monthly' }];


  accounts: AccountType[] = [];


  isSelectAccount: boolean = false;


  isbillPayed: boolean = false;

  frequency_arr = [{ name: 'daily' }, { name: 'weekly' }, { name: 'monthly' }];
  frequency: any;


  createBillForm!:FormGroup;

  billFormInputControls = [{name:'billName',label:'bill',type:'text'},{name:'amount',label:'amount',type:'number'},{name:'frequency',label:'frequency',type:'select'},{name:'account_id',label:'accounts',type:'select'}]

  btnName:string = 'createBill'


  dateToday = new Date();

  // createBillForm: FormGroup;

  constructor(private billService: BillsService, private accountService: AccountService, private messageService: MessageService) {

    this.createBillForm = new FormGroup({
      billName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(20)]),
      amount: new FormControl(0, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.min(1),Validators.max(10000)]),
      frequency: new FormControl('Monthly', [Validators.required]),
      account_id: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(35)]),
    });

    

  }


  // accounts: { name: string, balance: number, account_type: string, id: number, account_number: string }[] = [];



  ngOnInit() {
    
    this.fetchBills();

  }



  fetchBills() {

    this.billService.getBills().subscribe((result: any) => {
      this.bills = result;
    }, (error) => {
      console.log(error);
    })

    this.billService.getbillshistory().subscribe((result: any) => {
      this.billsTranscation = result;
    }, (error) => {
      console.log(error);
    })
    
    this.accountService.getAllaccounts().subscribe((result: any) => {
      //console.log(result[0].accounts); 
      this.accounts = result[0].accounts;
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching accounts' });
    })
  }

 
  selectAccount(account_id:number) {

    this.fetchTranscations(this.pageNumber,account_id)

    this.isSelectAccount = true;
  }



  showDialog() {
    this.visible = true;
    
    // console.log(this.accounts);
  }


  createBill(value:any) {
    // console.log(val);
    // console.log("event called");
    
    // console.log(this.createBillForm.value);
    // console.log(value.account_id.id);
    
    // console.log(value.account);
    
    this.billService.createBill(value.billName,value.amount, value.frequency, value.account_id.id).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill created successfully' });
      this.visible = false;
      this.ngOnInit();
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
      return;
    })
  }


  isBillUpdatedParent($event: any) {
    this.fetchBills();
  }

  isBillDeletedParent($event: any) {
    this.fetchBills();
  }



  fetchTranscations(pageNumber: number = 1, acc_id = 0) {
    this.billService.getbillshistory(pageNumber, acc_id).subscribe((result: any) => {
      this.billsTranscation = result;
    }, (error: any) => {
      console.log(error);
    })
  }

  first: number = 0;
  
  
    rows: number = 10;

    pageNumber = 1;
  
    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
         this.pageNumber = event.first!/10 + 1;
        this.fetchTranscations(this.pageNumber,0) 
    }

}
