import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';
import { SupportModule } from '../support/support.module';
import { SupportAdminComponent } from './support-admin/support-admin.component';
import { SharedModule } from "../../shared/shared.module";
@NgModule({
  declarations: [
    DashboardComponent,
    AccountsComponent,
    SupportAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    DataViewModule,
    RouterModule,
    ReactiveFormsModule,
    HomeModule,
    SupportModule,
    SharedModule
],
  exports: [
    DashboardComponent,
    AccountsComponent,
    SupportAdminComponent
  ],
  providers: [] // Add any services if needed
})
export class AdminModule { }