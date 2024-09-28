import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory, IIcon } from 'src/app/shared/models/responses';
import { HttpErrorResponse } from '@angular/common/http';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { CategoryType } from 'src/app/shared/models/enums';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Edit Category'

    categoryForm!: FormGroup;
    sub!: Subscription;
    public errorMessage = '';
    public error?: HttpErrorResponse;
    public category!: ICategory | undefined;
    icons: IIcon[] = [];
    public CategoryType = CategoryType;
    

    
    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder){}

    ngOnInit(): void {
        this.categoryForm = this.fb.group({
            categoryName: '',
            categoryType: CategoryType.Expense,
            iconId: null
        });

        this.categoryService.getIcons().subscribe({
          next: response => {
            this.icons = response;
            console.log('icons');
            console.log(response);
          },
              error: err => {
                  console.log(err);
                  this.error = err;
                  this.errorMessage = err.errorMessage;
              }
      })

        

        this.sub = this.route.paramMap.subscribe(
          params => {
            const id = Number(this.route.snapshot.paramMap.get('id'));
            this.categoryService.getCategoryById(id).subscribe({
                next: response => {
                  this.category = response;
                  this.displayCategory()
                },
                error: err => {
                    console.log(err);
                    this.error = err;
                    this.errorMessage = err.errorMessage;
              }
            })
          }
        )
    }

    displayCategory(){
        if(this.categoryForm){
            this.categoryForm.reset();
        }
        // Update the data on the form
        this.categoryForm.patchValue({
            categoryName: this.category?.name,
            type: this.category?.type,
            iconId: this.category?.icon?.id
        })
    }
    saveCategory() {
        let iconId: number = Number(this.categoryForm.value.iconId);
        let categoryType: CategoryType = Number.parseInt(this.categoryForm.value.categoryType);
        if (this.categoryForm.valid) {
            let request: IAddCategoryRequest = {
                name: this.categoryForm.value.categoryName,
                type: categoryType,
                iconFk: iconId
            }
            this.categoryService.updateCategory(this.category!.id, request).subscribe({ // updateCategory
                next: () => this.onSaveComplete(),
                error: err => {
                    console.log(err);
                    this.error = err;
                    this.errorMessage = err.errorMessage;
                }
            });
        }
    }

      onCancel(){
          this.router.navigate(['/categories']);
      }

      onSaveComplete(): void {
        this.categoryForm.reset();
        this.router.navigate(['/categories']);
      }

      ngOnDestroy(){
        this.sub.unsubscribe();
      }
      

}
