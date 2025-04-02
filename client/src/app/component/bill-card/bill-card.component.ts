import { Component, Input } from '@angular/core';
import { BillsService } from '../../Services/bills.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from '../../Services/account.service';
import { EventEmitter, Output } from '@angular/core';
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


  frequency_arr = [{ name: 'daily' }, { name: 'weekly' }, { name: 'monthly' }];
  frequency: any;

  constructor(private billService: BillsService, private messageService: MessageService, private accountService: AccountService, private confirmationService: ConfirmationService) { }

  @Input() bill: any;

  @Output() isBillUpdated = new EventEmitter<any>();
  @Output() isBillDeleted = new EventEmitter<any>();

  accounts: { name: string, balance: number, account_type: string, id: number, account_number: string }[] = [];
  selectedAccounts: any = undefined;
  isSelectAccount: boolean = false;
  isbillPayed: boolean = false;
  dialogtype: string = '';

  selectAccount() {
    this.isSelectAccount = true;
    // console.log(this.selectedAccounts);
  }

  showDialog(type: string) {
    this.dialogtype = type;
    // console.log(type, this.dialogtype);
    this.visible = true;
    this.visible = true;
    this.accountService.getAllaccounts().subscribe((result: any) => {
      //console.log(result[0].accounts); 
      // if(result[0].accounts.isVerified){
      this.accounts = result[0].accounts;
      // }
      
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching accounts' });
    })
    // console.log(this.accounts);
    this.frequency = this.bill.frequency;
    this.billName = this.bill.billName;
    this.amount = this.bill.amount;
  }

  acc_number: number = 0;

  payBill($event: any) {
    if (this.selectedAccounts == undefined) {
        this.selectedAccounts = this.bill.account; 
    }
    console.log(this.selectedAccounts);
    this.visible = true;
    this.billService.paybills(this.bill.id, this.selectedAccounts.id).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill paid successfully' });
      this.visible = false;
      this.isbillPayed = true;
      this.isBillUpdated.emit(this.bill.id);
      this.isBillDeleted.emit(this.bill.id);
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error paying bill' });
      return;
    })

    //this.isbillPayed=false
  }


  updateBill(event: any) {
    this.billService.updateBill(this.bill.id, this.billName, this.amount, this.frequency.name, this.selectedAccounts.id).subscribe((result: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill updated successfully' });
      this.visible = false;
      this.isBillUpdated.emit(this.bill.id);
      this.isBillDeleted.emit(this.bill.id);
    }, (error: any) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating bill' });
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
