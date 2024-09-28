import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from 'src/app/shared/models/responses';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    constructor (private categoryService: CategoryService) {}

    public categories: ICategory[] = [];

    public errorMessage = '';
    public error?: HttpErrorResponse;

    ngOnInit(){
        this.categoryService.getCategoriesList()
        .subscribe({
          next: data =>  this.categories = data.list,
          error: err => {
            this.error = err;
            this.errorMessage = err.errorMessage;
          }
        });
    }

    getCategories(){
        this.categoryService.getCategoriesList().subscribe({
            next: data =>  this.categories = data.list,
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

    filterCategories(type: number) {
        this.categories.filter(x => x.type == type);
    }
}
