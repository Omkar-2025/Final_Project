import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
visible: any;

  constructor(private adminService:AdminService,private messageService:MessageService){}
  allQueries:any = [];
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
  

}
