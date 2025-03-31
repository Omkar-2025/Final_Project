import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CardComponent } from '../../component/card/card.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CardComponent, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule,
    CardModule,
    ButtonModule,
    MessageModule,
    DropdownModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  exports: [
    HomeComponent, 
  ],
})
export class HomeModule {}