import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CategoryType } from 'src/app/shared/models/enums';
import { IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent implements OnInit {
    public error?: HttpErrorResponse;

    pageTitle: string = 'Add Category'
    categoryForm!: FormGroup;
    icons: IIcon[] = [];
    
    constructor(
        public modalRef: MdbModalRef<CategoryAddComponent>,
        private categoryService: CategoriesService,
        private errorService: ErrorService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.categoryForm = this.fb.group({
            categoryName: '',
            categoryType: 0,
            iconId: null
        })

        this.categoryService.getIcons().subscribe({
            next: response => {
                this.icons = response;
            },
            error: err => {
                this.error = err;
                this.errorService.showError(this.error?.error.Error || 'Failed to load icons');
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
                    this.error = err;
                    this.errorService.showError(this.error?.error.Error || 'Failed to create category'); 
                }
            });
        }
    }
  
    onSaveComplete(): void {
        this.categoryForm.reset();
        this.modalRef.close()
    }

    onCancel() {
        this.modalRef.close();
    }

}
