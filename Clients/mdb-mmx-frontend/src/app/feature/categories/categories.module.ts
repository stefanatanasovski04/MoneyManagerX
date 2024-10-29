import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CategoryListComponent } from './compontents/category-list/category-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
        {path:'categories', component:CategoryListComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class CategoriesModule { }
