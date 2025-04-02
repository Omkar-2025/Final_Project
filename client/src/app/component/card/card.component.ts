import { Component, Input } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';
import {AdminService} from '../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

visible: any;
showDialog() {

}

  role:string='';

  constructor(private accountService:AccountService,private router:Router,
    private adminService:AdminService,
    private messageService:MessageService
  ){

  }
  
  @Input()  account:any;
  @Output() accountVerified = new EventEmitter<boolean>();


  ngOnInit(){
    this.role = localStorage.getItem('role')!;
    console.log(this.role); 
  }

  viewFullaccountInfo(id:number){
    console.log(id);
    this.router.navigate(['/account',id]);
  }

  verifyAccount(accountId:number){
    console.log(accountId);
    this.adminService.verifyAccount(accountId).subscribe((res:any)=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: res.msg, life: 3000});
      // this.fetchAllAccounts();
      this.accountVerified.emit(true);  
    }
    ,( err:any )=>{
      console.log(err.error.msg);
      this.messageService.add({severity:'error', summary: 'Error', detail: err.error.msg, life: 3000});
    }
  )
  }
  
}
