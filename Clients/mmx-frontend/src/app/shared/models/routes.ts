import { Routes } from "@angular/router";
import { CategoryAddComponent } from "src/app/feature/categories/components/category-add/category-add.component";
import { CategoryEditComponent } from "src/app/feature/categories/components/category-edit/category-edit.component";
import { CategoryListComponent } from "src/app/feature/categories/components/category-list/category-list.component";

export const DEFAULT_ROUTES: Routes = [
    {path:'', redirectTo:'spending',pathMatch:'full'},
    {path:'**', redirectTo:'spending', pathMatch:'full'}
]

export const CATEGORY_ROUTES: Routes = [
    {path:'categories', component:CategoryListComponent},
    {path:'categories/add', component:CategoryAddComponent},
    {path:'categories/:id/edit', component:CategoryEditComponent},
]