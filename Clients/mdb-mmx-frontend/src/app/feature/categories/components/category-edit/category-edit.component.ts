import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory, IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
    public category!: ICategory | undefined;
    
    categoryId!: number;
    messages: Message[] | undefined;
    categoryForm!: FormGroup;
    icons: IIcon[] = [];
    pageTitle: string = 'Edit Category'
  
    constructor(
        public modalRef: MdbModalRef<CategoryEditComponent>,
        private categoryService: CategoriesService,
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
                this.addMessages(err?.error.Error || 'Failed to load icons')
            } 
        })

        this.categoryService.getCategoryById(this.categoryId).subscribe({
            next: response => {
                this.category = response;
                this.displayCategory()
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to load Category')
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
                    this.addMessages(err?.error.Error || 'Failed to edit Category')
                }
            });
        }
    }

    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    onSaveComplete(): void {
        this.categoryForm.reset();
        this.modalRef.close()
    }

    onCancel(){
        this.modalRef.close();
    }
}
