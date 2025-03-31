import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BillsComponent } from './bills.component';
import { BillCardComponent } from '../../component/bill-card/bill-card.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaymentComponent } from '../../component/payment/payment.component';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    BillsComponent,
    BillCardComponent,
    PaymentComponent
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
    ProgressSpinnerModule 
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  exports: [
    BillsComponent,
    BillCardComponent,
    PaymentComponent 
  ]
})
export class BillsModule { }