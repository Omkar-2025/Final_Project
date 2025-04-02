import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
visible: any;

  constructor(private adminService:AdminService,private messageService:MessageService,private router:Router){}
  allQueries:any = [];
  allUsers:any=[];
  selectedQuery:any = {};
  reply:string='';

  fetchAllQuerys(){
    this.adminService.getAllSupports().subscribe((res:any)=>{
      this.allQueries=res.msg;
      console.log(res);
    },( err:any )=>{
      console.log(err.error.msg);
    })
  }

  ngOnInit(){
    this.fetchAllQuerys();
    this.fetchAllAccounts();
  }


  fetchAllAccounts(){
      this.adminService.getAllUsers().subscribe((res:any)=>{
        this.allUsers=res.msg;
      },( err:any )=>{
        console.log(err.error.msg);
      })
  }

  verifyAccount(accountId:number){
    console.log(accountId);
    this.adminService.verifyAccount(accountId).subscribe((res:any)=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: res.msg, life: 3000});
      this.fetchAllAccounts();
    }
    ,( err:any )=>{
      console.log(err.error.msg);
      this.messageService.add({severity:'error', summary: 'Error', detail: err.error.msg, life: 3000});
    }
  );
  }


  showDialog(supportQuery:any){
    this.visible=true;
    this.selectedQuery=supportQuery;
  }


  resolveQuery(){
      this.adminService.resolveQuery(this.selectedQuery.id,this.reply).subscribe((res:any)=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: res.msg, life: 3000});
        this.visible=false;
        this.reply='';
        this.fetchAllQuerys();  
      },( err:any )=>{
        console.log(err.error.msg);
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.msg, life: 3000});
      })
  }

  selectUser(data:any){
    // console.log(id.id);
    let id = data.id;
    this.adminService.getAccountByUserId(id).subscribe((res:any)=>{
      this.router.navigate(['/dashboard/userAccounts',id]);
    },( err:any )=>{
      console.log(err.error.msg);
    })
  }
  

}
