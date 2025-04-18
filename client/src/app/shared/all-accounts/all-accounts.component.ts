import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountType } from '../../types/account';
import { AccountService } from '../../Services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-accounts',
  standalone: false,
  templateUrl: './all-accounts.component.html',
  styleUrl: './all-accounts.component.css'
})
export class AllAccountsComponent implements OnInit {

  @Output() selectedAccountEmit = new EventEmitter();

  isSelectAccount: boolean = false;
  selectedAccounts: AccountType = { userId: 0, accountNumber: '', account_type: '', balance: 0, createdAt: undefined, name: '' , isVerified:false};
  accounts: AccountType[] = [];

  constructor(private accountService: AccountService, private messageService: MessageService) { }


  ngOnInit() {
    this.accountService.getAllaccounts().subscribe((result: any) => {
      this.accounts = result[0].accounts;
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching accounts' });
    })
  }

  selectAccount(event: any) {

    this.selectedAccounts = event.value
  
    const account_id = event.value.id
    this.selectedAccountEmit.emit(account_id)
  
    this.isSelectAccount = true;
  
  }

}







