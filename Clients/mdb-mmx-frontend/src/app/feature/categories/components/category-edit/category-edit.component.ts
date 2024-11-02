import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory, IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
    public error?: HttpErrorResponse;
    public category!: ICategory | undefined;
    
    categoryId!: number;
    categoryForm!: FormGroup;
    icons: IIcon[] = [];
    pageTitle: string = 'Edit Category'
  
    constructor(
        public modalRef: MdbModalRef<CategoryEditComponent>,
        private categoryService: CategoriesService,
        private errorService: ErrorService,
        private fb: FormBuilder
    ){}



    ngOnInit(): void {
        this.categoryForm = this.fb.group({
            categoryName: '',
            categoryType: 0,
            iconId: null
        });

        this.categoryService.getIcons().subscribe({
            next: response => {
                this.icons = response;
            },
            error: err => {
                this.error = err;
                this.errorService.showError(this.error?.error.Error || 'Failed to load Icons'); 
            } 
        })

        this.categoryService.getCategoryById(this.categoryId).subscribe({
            next: response => {
                this.category = response;
                this.displayCategory()
            },
            error: err => {
                this.error = err;
                this.errorService.showError(this.error?.error.Error || 'Failed to load Category'); 
            }
        })
    }

    displayCategory(){
        if(this.categoryForm){
            this.categoryForm.reset();
        }
        this.categoryForm.patchValue({
            categoryName: this.category?.name,
            type: this.category?.type ?? 0,
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

            this.categoryService.updateCategory(this.category!.id, request).subscribe({
                next: () => this.onSaveComplete(),
                error: err => {
                    this.error = err;
                    this.errorService.showError(this.error?.error.Error || 'Failed to edit Category'); 
                }
            });
        }
    }

    onSaveComplete(): void {
        this.categoryForm.reset();
        this.modalRef.close()
    }

    onCancel(){
        this.modalRef.close();
    }
}
