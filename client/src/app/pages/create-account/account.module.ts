import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { AccountComponent } from '../../component/account/account.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CardComponent } from '../../component/card/card.component';
import { HomeModule } from '../home/home.module';
import { SelectModule } from 'primeng/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CreateAccountComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    FormsModule,
    DialogModule,
    HomeModule,
    SelectModule,
    PaginatorModule,
    SharedModule
  ],
  exports: [
    CreateAccountComponent,
    AccountComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class AccountModule { }
