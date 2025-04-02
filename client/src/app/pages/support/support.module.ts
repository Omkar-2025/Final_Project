import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SupportComponent } from './support.component';
import { SupportQueryComponent } from '../../component/support-query/support-query.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MessageModule } from 'primeng/message';
@NgModule({
  declarations: [
    SupportComponent,
    SupportQueryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule ,
    FormsModule,
    InputTextModule,
    AdminRoutingModule,
    MessageModule
  ],
  providers:[
      MessageService,
      ConfirmationService
  ],
  exports:[
    SupportComponent,
    SupportQueryComponent
  ]
})
export class SupportModule { }
