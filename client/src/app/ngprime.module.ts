import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { ConfirmDialog } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputOtpModule } from "primeng/inputotp";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { MessageModule } from "primeng/message";
import { PasswordModule } from "primeng/password";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SelectModule } from "primeng/select";
import { ToastModule } from "primeng/toast";


@NgModule({

    declarations:[

    ],

    imports:[
        InputTextModule,
        ButtonModule,
        ToastModule,
        CardModule,
        DividerModule,
        PasswordModule,
        InputOtpModule,
        FormsModule,
        ProgressSpinnerModule,
        MenubarModule,
        DialogModule,
        MessageModule,
        DropdownModule,
        SelectModule,
        CalendarModule,
        ConfirmDialog
    ],
    exports:[
        InputTextModule,
        ButtonModule,
        ToastModule,
        CardModule,
        DividerModule,
        PasswordModule,
        InputOtpModule,
        FormsModule,
        ProgressSpinnerModule,
        MenubarModule,
        DialogModule,
        MessageModule,
        DropdownModule,
        SelectModule,
        CalendarModule,
        ConfirmDialog
    ]
})


export class NgPrimeModule{}
