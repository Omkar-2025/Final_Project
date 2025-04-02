import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-admin',
  standalone: false,
  templateUrl: './support-admin.component.html',
  styleUrl: './support-admin.component.css'
})
export class SupportAdminComponent {


  constructor(private adminService:AdminService,private messageService:MessageService,private rotuer:ActivatedRoute){}

  supportQueries:any[] = [];
  selectedQuery:any = null;
  id:number=0;
  fetchSupportQueries() {
    this.rotuer.params.subscribe((params)=>{
      this.id=params['id'];
    })
    this.adminService.getQueryById(this.id).subscribe((response:any) => {
      this.supportQueries = response.msg;
    }, (error:any) => {
      console.error('Error fetching support queries:', error);
    });
  }

  supportQueryDeleted(event:any){
    this.fetchSupportQueries();
  } 
  
  ngOnInit() {
    this.fetchSupportQueries();
  }

}
