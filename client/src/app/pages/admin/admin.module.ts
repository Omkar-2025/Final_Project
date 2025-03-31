import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule,
    DialogModule,
    FormsModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: []
})
export class AdminModule { }
