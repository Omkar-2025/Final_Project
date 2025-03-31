import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private accountService:AccountService){}

    accounts:any;

  ngOnInit(){
    this.accountService.getAllaccounts().subscribe((result:any)=>{
      this.accounts=result;
      
    })
  }

}
