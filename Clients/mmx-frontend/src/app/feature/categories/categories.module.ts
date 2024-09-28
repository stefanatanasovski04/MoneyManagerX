import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CATEGORY_ROUTES } from 'src/app/shared/models/routes';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(CATEGORY_ROUTES)
  ]
})
export class CategoriesModule { }
