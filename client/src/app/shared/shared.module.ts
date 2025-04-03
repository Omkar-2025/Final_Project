import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { BarchartComponent } from './barchart/barchart.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    BarchartComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    SelectModule,
    FormsModule
  ],
  exports:[
    BarchartComponent
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
