import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { BarchartComponent } from './piechart/barchart.component';
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
import { BarchartComponent1 } from './barchart/barchart.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    GenericDisplayTranscationComponent,
    DigalogComponent,
    BarchartComponent,
    BarchartComponent1,
    AllAccountsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    MessageModule,
    RouterModule,
    ChartModule,
    ProgressSpinnerModule
],
  exports:[
    BarchartComponent,
    GenericDisplayTranscationComponent,
    DigalogComponent,
    ButtonModule,
    BarchartComponent1,
    AllAccountsComponent,
    SpinnerComponent
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
