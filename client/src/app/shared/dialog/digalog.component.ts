import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-digalog',
  standalone: false,
  templateUrl: './digalog.component.html',
  styleUrl: './digalog.component.css'
})
export class DigalogComponent {

  @Input() formGroup!:FormGroup;
  @Input() InputControls!:{name:string,label:string,type:string}[];
  @Input() categories:any=[];
  @Input() btnlabel!:string;
  @Input() frequency_arr:any=[];
  @Input() accounts:any[]=[];
  
  @Input() type!:string;
  @Output() formSubmit = new EventEmitter<any>();


  selectedAccounts: any = undefined;
  isAccountselected: boolean = false;

  selectAccount(event:any){
      let selectedAccount = event.value; // Access the selected account
      this.selectedAccounts = selectedAccount; // Update the selectedAccounts property
      this.isAccountselected = true; 
      selectedAccount= +selectedAccount
      // Set the flag to true
  
    this.isAccountselected=true;
    // this.selectedAccounts=value;

    this.accounts.map((account:any)=>{
      if(account.id==selectedAccount){
        this.selectedAccounts=account;
         // console.log(this.selectedAccounts);
      }
    })  

    
    // console.log(this.isAccountselected);
    // console.log("vwno");
    
  }




  ngOnInit(){
      // console.log(this.accounts);
      // console.log(this.InputControls);
      // console.log(this.formGroup);
      
    // console.log(this.accounts[0]);  
      
  }


  onSubmit(){

    // console.log(this.accounts);
    
    // console.log("event emitted ");
    

    if(this.formGroup.valid){

      // console.log("event emitted");
      
      this.formSubmit.emit(this.formGroup.value);
      }
      
  }

}
