import { Component, Input } from '@angular/core';
import { BillsService } from '../../Services/bills.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from '../../Services/account.service';
import { EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bill-card',
  standalone: false,
  templateUrl: './bill-card.component.html',
  styleUrl: './bill-card.component.css'
})
export class BillCardComponent {

  visible: any;
  isupdateBill: any;
  billName: any;
  amount: any

  isLoading: boolean = false; 

  // @Input() bill!:any;


  @Input()  accounts!: any[];


  frequency_arr = [{ name: 'daily' }, { name: 'weekly' }, { name: 'monthly' }];
  frequency: any;


  updateBillFrom!:FormGroup;

  billFormInputControls = [{name:'billName',label:'bill',type:'text'},{name:'amount',label:'amount',type:'number'},{name:'frequency',label:'frequency',type:'select'},{name:'account',label:'accounts',type:'select'}]

  btnName:string = 'updateBill';

  payBillBtn : string = 'paybill';

  payBillFormGroup!:FormGroup;

  payBillInputControls=[{name:'account',label:'accounts',type:'select'}]

  constructor(private billService: BillsService, private messageService: MessageService, private accountService: AccountService, private confirmationService: ConfirmationService) { 

    this.updateBillFrom = new FormGroup({
      billName:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      amount:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      frequency:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      account:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    })

    this.payBillFormGroup = new FormGroup({
      account:new FormControl('',[Validators.required , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    })





  }

  @Input() bill: any;

  @Output() isBillUpdated = new EventEmitter<any>();
  @Output() isBillDeleted = new EventEmitter<any>();

 
  selectedAccounts: any = undefined;
  isSelectAccount: boolean = false;
  isbillPayed: boolean = false;
  dialogtype: string = 'Update the bill';
  


  selectAccount() {
    this.isSelectAccount = true;
  
  }

  showDialog(type: string) {
    this.dialogtype = type;
    console.log(type);
    
 
    this.visible = true;
    this.visible = true;
   
   
    this.frequency = this.bill.frequency;
    this.billName = this.bill.billName;
    this.amount = this.bill.amount;

    this.updateBillFrom.patchValue({
      billName: this.bill.billName,
      amount: this.bill.amount,
      frequency: this.bill.frequency,
      account: this.bill.account.id
    })
  }

  acc_number: number = 0;

  payBill(value: any) {

    // console.log($event);
    
    this.isLoading = true;
    if (this.selectedAccounts == undefined) {
        this.selectedAccounts = this.bill.account; 
    }
    // console.log(value.account);
    // console.log(this.bill);
    // console.log(value);
    // console.log(value.account.id);
    
    
    let accountId = parseInt(value.account.id)
    
    this.visible = false;
    this.billService.paybills(this.bill.id, accountId).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill paid successfully' });
      this.visible = false;
      this.isbillPayed = true;
      this.isBillUpdated.emit(this.bill.id);
      this.isBillDeleted.emit(this.bill.id);
      this.isLoading = false;
      this.visible=false;
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
      this.isLoading=false;
      return;
    })

    //this.isbillPayed=false
  }


  updateBill(value: any) {

    // console.log(value);

    this.visible=false;

    this.billService.updateBill(this.bill.id, value.billName, value.amount, value.frequency, value.account).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill updated successfully' });
      this.visible = false;
      this.isBillUpdated.emit(this.bill.id);
      this.isBillDeleted.emit(this.bill.id);
      this.isLoading=false;
      
    }, (error: any) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
    })
  }


  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        // console.log(this.bill.id);
        this.billService.deleteBill(this.bill.id).subscribe((result: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill deleted successfully' });
          this.visible = false;
          this.isBillDeleted.emit(this.bill.id);
          this.isBillUpdated.emit(this.bill.id);
        },(error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting bill' });
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }


}
