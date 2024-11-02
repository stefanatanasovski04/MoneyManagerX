import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
    public error?: HttpErrorResponse;
    public categories: ICategory[] = [];
    public CategoryType = CategoryType;

    filteredCategories = [];
    selectedCategoryType: number = 0;
    modalRefAdd: MdbModalRef<CategoryAddComponent> | null = null;
    modalRefEdit: MdbModalRef<CategoryEditComponent> | null = null;

    constructor (
        private categoryService: CategoriesService,
        private modalService: MdbModalService,
        private errorService: ErrorService
    ) {}

    ngOnInit(){
        this.getCategories();
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
                this.errorService.showError(this.error?.error.Error || 'Failed to load Category List'); 
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
                this.errorService.showError(this.error?.error.Error || 'Failed to Delete Category'); 
            }
        });
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(CategoryAddComponent) 

        this.modalRefAdd.onClose.subscribe(() => {
            this.getCategories();
        })
    }

    openEditModal(id: number){
        this.modalRefEdit = this.modalService.open(CategoryEditComponent, {
            data: {categoryId: id }
        }) 

        this.modalRefEdit.onClose.subscribe(() => {
            this.getCategories();
        })
    }
}
