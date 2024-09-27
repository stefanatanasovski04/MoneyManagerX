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
export class CategoryListComponent implements OnInit, OnDestroy {
    constructor (private categoryService: CategoryService) {}

    public categories: ICategory[] = [];
    sub!: Subscription;

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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
