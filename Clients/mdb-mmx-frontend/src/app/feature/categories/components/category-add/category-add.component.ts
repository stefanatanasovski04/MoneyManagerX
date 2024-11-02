import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CategoryType } from 'src/app/shared/models/enums';
import { IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent implements OnInit {
    pageTitle: string = 'Add Category'
    categoryForm!: FormGroup;
    icons: IIcon[] = [];
    messages: Message[] | undefined;

    constructor(
        public modalRef: MdbModalRef<CategoryAddComponent>,
        private categoryService: CategoriesService,
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
                this.addMessages(err?.error.Error || 'Failed to load icons')
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
                    this.addMessages(err?.error.Error || 'Failed to create category')
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

    onCancel() {
        this.modalRef.close();
    }
}
