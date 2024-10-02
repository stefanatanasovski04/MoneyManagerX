import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IIcon } from 'src/app/shared/models/responses';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryType } from 'src/app/shared/models/enums';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit{
    
    pageTitle: string = 'Add Category'
    public errorMessage = '';
    public error?: HttpErrorResponse;
    categoryForm!: FormGroup;
    icons: IIcon[] = [];
    public CategoryType = CategoryType;

      constructor(
          private categoryService: CategoryService,
          private router: Router,
          private fb: FormBuilder
      ) { }

    ngOnInit() {
        this.categoryForm = this.fb.group({
            categoryName: '',
            categoryType: 0,
            iconId: null
        })

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
    }

    saveCategory(): void {
        let iconId: number = Number(this.categoryForm.value.iconId);
        let categoryType: CategoryType = Number.parseInt(this.categoryForm.value.categoryType);
        if (this.categoryForm.valid) {
            let request: IAddCategoryRequest = {
                name: this.categoryForm.value.categoryName,
                type: categoryType,
                iconFk: iconId
            }
            this.categoryService.createCategory(request).subscribe({
              next: () => this.onSaveComplete(),
              error: err => {
                  console.log(err);
                  this.error = err;
                  this.errorMessage = err.errorMessage;
              }
          });
        }
      }
    
      onSaveComplete(): void {
        this.categoryForm.reset();
        this.router.navigate(['/categories']);
      }

    onCancel() {
        this.router.navigate(['/categories']);
    }
}
