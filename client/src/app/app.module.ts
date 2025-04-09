import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import { HomeModule } from './pages/home/home.module';
import { AccountModule } from './pages/create-account/account.module';
import { BillsModule } from './pages/bills/bills.module';
import { AuthModule } from './pages/auth/auth.module';
import { SupportModule } from './pages/support/support.module';
import { AdminModule } from './pages/admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './pages/profile/profile.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    AccountModule,
    AuthModule,
    SharedModule,
    ProfileModule,
    AdminModule,
    BillsModule
  ], providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none'
        } 
    }
    }),
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
