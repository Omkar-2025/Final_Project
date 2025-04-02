import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "../../shared/shared.module";
import { HomeModule } from "../home/home.module";



@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
    HomeModule,
    SharedModule
],
    exports: [
        ProfileComponent
    ],
    providers: [],
})

export class ProfileModule { }