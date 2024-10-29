import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFormsModule,
    RouterModule.forChild([
        {path:'categories', component:CategoryListComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class CategoriesModule { }
