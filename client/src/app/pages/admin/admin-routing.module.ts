import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { Routes } from "@angular/router";
import { SupportComponent } from "../support/support.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { SupportAdminComponent } from "./support-admin/support-admin.component";

const routes:Routes = [
    {path:'dashboard/userAccounts/:id',component:AccountsComponent},
    {path:'admin/support',component:SupportAdminComponent},
    {path:'admin/allUsers',component:AllUsersComponent}
]


@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule{}