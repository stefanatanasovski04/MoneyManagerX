import { Routes } from "@angular/router";
import { CategoryAddComponent } from "src/app/feature/categories/components/category-add/category-add.component";
import { CategoryEditComponent } from "src/app/feature/categories/components/category-edit/category-edit.component";
import { CategoryListComponent } from "src/app/feature/categories/components/category-list/category-list.component";
import { SpendingComponent } from "src/app/feature/spending/spending.component";
import { TransactionAddComponent } from "src/app/feature/transactions/components/transaction-add/transaction-add.component";
import { TransactionEditComponent } from "src/app/feature/transactions/components/transaction-edit/transaction-edit.component";
import { TransactionListComponent } from "src/app/feature/transactions/components/transaction-list/transaction-list.component";

export const DEFAULT_ROUTES: Routes = [
    {path:'spending', component:SpendingComponent},
    {path:'', redirectTo:'spending',pathMatch:'full'},
    {path:'**', redirectTo:'spending', pathMatch:'full'}
]

export const CATEGORY_ROUTES: Routes = [
    {path:'categories', component:CategoryListComponent},
    {path:'categories/add', component:CategoryAddComponent},
    {path:'categories/:id/edit', component:CategoryEditComponent},
]

export const TRANSACTION_ROUTES: Routes = [
    {path:'transactions', component:TransactionListComponent},
    {path:'transactions/add', component:TransactionAddComponent},
    {path:'transactions/:id/edit', component:TransactionEditComponent},
]