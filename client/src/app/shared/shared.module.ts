import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { BarchartComponent } from './barchart/barchart.component';



@NgModule({
  declarations: [
    BarchartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports:[
    BarchartComponent
  ]
})
export class SharedModule { }
