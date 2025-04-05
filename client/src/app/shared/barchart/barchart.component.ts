import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { AccountType } from '../../types/account';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {


  data: any=[];

  options: any;
 
  result: any =[];


    selectedMonth: any | undefined = null;


    monthFrequencies = [
      { name: "Jan", val: 1 },
      { name: "Feb", val: 2 },
      { name: "Mar", val: 3 },
      { name: "Apr", val: 4 },
      { name: "May", val: 5 },
      { name: "Jun", val: 6 },
      { name: "Jul", val: 7 },
      { name: "Aug", val: 8 },
      { name: "Sep", val: 9 },
      { name: "Oct", val: 10 },
      { name: "Nov", val: 11 },
      { name: "Dec", val: 12 }
  ];


   accounts: AccountType[] = [];
   

   selectedAccount:any = null;

   selectMonthId:any=null;

   isSelectAccount:boolean = false;



   selectedMonthOption(){
      // console.log(this.selectedMonth);
      // console.log(this.selectedAccount);

      this.isSelectAccount = true;
      if(this.selectedAccount){
        this.selectMonthId=this.selectedMonth.val;
        this.fetchData(this.selectedAccount.id);
      }
     
   }
  

  constructor(private cd: ChangeDetectorRef, private accountService: AccountService , private messageService:MessageService) {
    this.accountService.getAllaccounts().subscribe((result: any) => {
      this.accounts = result[0].accounts;
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching accounts' });
    })
    
  }

  fetchData(id:number) {
    // console.log(id); 
    this.accountService.getAllMonthlyExpense(id).subscribe((res: any) => {
      
      res.map((item:any)=>{
        
        if(item.month==this.selectMonthId){
            console.log(item);
            // console.log(item.month);
            // console.log(item);
            this.result = [];
            this.result.push(item.deposits);
            this.result.push(item.withdrawals);
            this.result.push(item.billPayments)
            this.result.push(item.transferAmount)
            console.log(this.result);
            
          }
      })
      // console.log(this.result);

      this.initChart();
      
    }, (error) => {
      console.log(error);
    })
  }


  platformId = inject(PLATFORM_ID);


  ngOnInit() {
    // this.fetchData(1);
  }



  initChart() {
    // console.log(this.result);
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: ['Deposits', 'withdrawals', 'billPayments','Transfer Amount'],
        datasets: [
          {
            data:this.result,
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500'),documentStyle.getPropertyValue('--p-red-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400'),documentStyle.getPropertyValue('--p-red-400')],
          }
        ]
      };
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()
    }
  }

}
