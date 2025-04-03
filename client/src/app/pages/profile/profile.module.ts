import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "../../shared/shared.module";
import { HomeModule } from "../home/home.module";
import { SelectModule } from 'primeng/select';
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { Select } from 'primeng/select';
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
    HomeModule,
    SharedModule,
    DialogModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule
],
    exports: [
        ProfileComponent
    ],
    providers: [],
})

export class ProfileModule { }