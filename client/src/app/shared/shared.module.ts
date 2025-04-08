import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { BarchartComponent } from './barchart/barchart.component';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HomeModule } from "../pages/home/home.module";
import { GenericDisplayTranscationComponent } from './generic-display-transcation/generic-display-transcation.component';
import { DigalogComponent } from './dialog/digalog.component';
import { Button, ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BarchartComponent,
    GenericDisplayTranscationComponent,
    DigalogComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    SelectModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    MessageModule,
    RouterModule
],
  exports:[
    BarchartComponent,
    GenericDisplayTranscationComponent,
    DigalogComponent,
    ButtonModule
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
