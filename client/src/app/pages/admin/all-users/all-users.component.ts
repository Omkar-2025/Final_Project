import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {


  allUsers:any=[];

  constructor(private adminService:AdminService,private messageService:MessageService,private router:Router){}


  fetchAllAccounts(){
    this.adminService.getAllUsers().subscribe((res:any)=>{
      this.allUsers=res.msg;
    },( err:any )=>{
      console.log(err.error.msg);
    })
}

ngOnInit(): void {
  this.fetchAllAccounts()
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
