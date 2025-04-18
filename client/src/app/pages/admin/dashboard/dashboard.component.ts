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
  AllExpenses:number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  reply:string='';

  labelsMonthOption:string[] = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

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
  
  ngAfterViewInit(){
    this.getAllExpenses();
  }


  fetchAllAccounts(){
      this.adminService.getAllUsers().subscribe((res:any)=>{
        this.allUsers=res.msg;
      },( err:any )=>{
        console.log(err.error.msg);
      })
  }

  verifyAccount(accountId:number){
    //console.log(accountId);
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


  getAllExpenses(){
    this.adminService.getAllExpenses().subscribe((res:any)=>{
      console.log(res.msg);
      res.msg.map((item:any)=>{
        // this.AllExpenses.push(item.totalAmount)
        if(item.month){
          this.AllExpenses[item.month-1]=item.totalAmount;
        }
      })
      // console.log(this.AllExpenses);
    },
      ( err:any )=>{
        console.log(err.error.msg);
      })  
  }
  

  navigateToAllUsers(){
    this.router.navigate(['admin/allUsers'])
  }

  navigateToAllQuery(){
    this.router.navigate(['admin/support'])
  }


}
