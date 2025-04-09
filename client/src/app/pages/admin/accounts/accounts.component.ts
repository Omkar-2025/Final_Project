import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  constructor(private adminService:AdminService,private messageService:MessageService,private router:ActivatedRoute){}

  allaccounts:any=[];
  allSupportQueries:any=[];

  id=0;
  fetchAllAccounts(){
    this.router.params.subscribe(params=>{
        this.id = params['id'];
    })
    this.adminService.getAccountByUserId(this.id).subscribe((res:any)=>{
      this.allaccounts=res.msg;
    }
    ,( err:any )=>{
      console.log(err.error.msg);
    })
  }

  ngOnInit(){
    this.fetchAllAccounts();
   
  }
  
  accountVerfied(event:any){
    this.fetchAllAccounts();
  }

  fetchAllSupportQuerys(){
    this.adminService.getAllSupports().subscribe((res:any)=>{
      this.allaccounts=res.msg;
      console.log(res);
    },( err:any )=>{
      console.log(err.error.msg);
    })


  
  }


}
