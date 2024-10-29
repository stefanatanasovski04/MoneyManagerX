import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  constructor (private categoryService: CategoriesService) {}

  public categories: ICategory[] = [];
  public CategoryType = CategoryType;
  public errorMessage = '';
  public error?: HttpErrorResponse;

  filteredCategories = [];
  selectedCategoryType;

  ngOnInit(){
      this.categoryService.getCategoriesList()
      .subscribe({
          next: data =>  {
            this.categories = data.list;
            this.filteredCategories = data.list;
            this.selectedCategoryType = 0;
          },
        error: err => {
          this.error = err;
          this.errorMessage = err.errorMessage;
        }
      });
  }

  filterCategories() {
      if (Number(this.selectedCategoryType) === 2) {
          this.filteredCategories = this.categories;
      } else {
          this.filteredCategories = this.categories.filter(
              category => category.type === Number(this.selectedCategoryType)
          );
      }
  }

  getCategories(){
      this.categoryService.getCategoriesList().subscribe({
          next: data =>  {
            this.categories = data.list
            this.filterCategories()
          },
          error: err => {
              this.error = err;
              this.errorMessage = err.errorMessage;
          }
      });
  }

  deleteCategory(id: number) {
      this.categoryService.deleteCategory(id).subscribe({
          next: () => {
              this.getCategories()
          },
          error: err => {
              this.error = err;
              this.errorMessage = err.errorMessage;
          }
      });
  }
}
