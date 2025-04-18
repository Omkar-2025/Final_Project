import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-admin',
  standalone: false,
  templateUrl: './support-admin.component.html',
  styleUrl: './support-admin.component.css'
})
export class SupportAdminComponent implements OnInit {


  constructor(private adminService:AdminService,private messageService:MessageService,private rotuer:ActivatedRoute){}

  supportQueries:any[] = [];

  selectedQuery:any = null;

  id:number=0;

  fetchSupportQueries() {
   
    this.adminService.getQueryById(this.id).subscribe((response:any) => {
      this.supportQueries = response.msg;
      console.log(response.msg);
    }, (error:any) => {
      console.error('Error fetching support queries:', error);
    });
  }

  supportQueryDeleted(event:any){
    this.fetchSupportQueries();
  } 


  fetchAllRequest(){
    this.adminService.getAllSupports().subscribe((data:any)=>{
      this.supportQueries=data.msg;
      console.log(data);
      
    },(error)=>{
      console.log(error);
    })
  }


  
  ngOnInit() {
  //  if(this.id != 0){
  //   this.fetchSupportQueries();
  //  }
  //  else{
  //   this.fetchAllRequest();
  //  }

  this.rotuer.params.subscribe((params)=>{
    this.id=params['id'];
    console.log(this.id); 
    
    if(this.id){
      this.fetchSupportQueries();
    }
    else{
      this.fetchAllRequest()
    }
  })

 
    
  }

}
