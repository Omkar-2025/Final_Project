import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BillsComponent } from './bills.component';
import { BillCardComponent } from '../../component/bill-card/bill-card.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { HomeModule } from "../home/home.module";
import { SharedModule } from "../../shared/shared.module";
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    BillsComponent,
    BillCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    MessageModule,
    HomeModule,
    SharedModule,
    PaginatorModule
],
  providers: [
    MessageService,
    ConfirmationService
  ],
  exports: [
    BillsComponent,
   
  ]
})
export class BillsModule { }