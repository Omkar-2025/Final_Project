import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { AdminService } from '../../Services/admin.service';


@Component({
  selector: 'app-barchart1',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})
export class BarchartComponent1 implements OnChanges {

  basicData: any;
 data:any[]=[0,0,0,0,0,0,0,0,0,0,0,0];
lables:any=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

    basicOptions: any;

    platformId = inject(PLATFORM_ID);

    // configService = inject(AppConfigService);

    constructor(private cd: ChangeDetectorRef, private adminService:AdminService) {}


    ngOnChanges(changes:SimpleChanges) {
        if(changes['lables'] && changes['data']){
            this.initChart();
        // console.log(this.data);
        // console.log(this.lables);
        }
    }

    ngOnInit(){
        this.getAllExpenses();
       
    }

    getAllExpenses(){
        this.adminService.getAllExpenses().subscribe((res:any)=>{
          console.log(res.msg);
          res.msg.map((item:any)=>{
            if(item.month){
              this.data[item.month-1]=item.totalAmount;
            }
          })

          console.log(this.data);
          this.initChart();
        },
          ( err:any )=>{
            console.log(err.error.msg);
          })  
      }
   
    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.basicData = {
                labels: this.lables,
                datasets: [
                    {
                        label: 'Expense',
                        data: this.data,
                        backgroundColor: [
                            'rgba(249, 115, 22, 0.2)',
                            'rgba(6, 182, 212, 0.2)',
                            'rgb(107, 114, 128, 0.2)',
                            'rgba(139, 92, 246, 0.2)',
                        ],
                        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                        borderWidth: 1,
                    },
                ],
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                },
            };
            this.cd.markForCheck()
        }
    }

}
