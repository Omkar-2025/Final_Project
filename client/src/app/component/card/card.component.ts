import { Component, Input } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';

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

  constructor(private accountService:AccountService,private router:Router
  ){}
  
  @Input()  account:any;


  ngOnInit(){
   
  }

  viewFullaccountInfo(id:number){
    console.log(id);
    this.router.navigate(['/account',id]);
  }

}
