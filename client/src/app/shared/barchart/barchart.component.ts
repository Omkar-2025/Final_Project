import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {


  data: any=[];

  options: any;
  // data:any=[100,200,300,400,500,600,700,800,900,1000,1100,1200,1300];
  result: any;

  constructor(private cd: ChangeDetectorRef, private accountService: AccountService) {}

  fetchData(){
    this.accountService.getAllMonthlyExpense(29).subscribe((res: any) => {
      this.result = res;
    }, (error) => {
      console.log(error);
    })
  }


  platformId = inject(PLATFORM_ID);


  ngOnInit() {
    this.fetchData();
    this.initChart();
    console.log(this.result);
  }



  initChart() {
    // console.log(this.result);
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [this.result],
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
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
