import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private accountService:AccountService,private router:Router){}

    accounts:any=[];

  ngOnInit(){ 
   this.fetchUserAccounts();
  }

  fetchUserAccounts(){
    this.accountService.getAllaccounts().subscribe((result:any)=>{
      this.accounts=result;
    },(err:any)=>{
      console.log(err.error.msg);
    })
  }

  getStartedbtn(){
    this.router.navigate(['/createaccount']);
  }

}
