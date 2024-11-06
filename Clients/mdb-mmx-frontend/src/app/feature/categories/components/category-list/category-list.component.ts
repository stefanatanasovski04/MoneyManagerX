import { Component, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Message } from 'primeng/api';
import { DeleteCategoryModalComponent } from '../delete-category-modal/delete-category-modal.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
    public categories: ICategory[] = [];
    public CategoryType = CategoryType;

    messages: Message[] | undefined;
    filteredCategories = [];
    selectedCategoryType: number = 2;
    modalRefAdd: MdbModalRef<CategoryAddComponent> | null = null;
    modalRefEdit: MdbModalRef<CategoryEditComponent> | null = null;
    modalRefDelete: MdbModalRef<DeleteCategoryModalComponent> | null = null;

    constructor (
        private categoryService: CategoriesService,
        private modalService: MdbModalService,
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
                this.addMessages(err?.error.Error || 'Failed to load Category List')
            }
        });
    }

    deleteCategory(id: number) {
        this.categoryService.deleteCategory(id).subscribe({
            next: () => {
                this.getCategories()
                this.addSuccessMessages('deleted');
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to Delete Category')
            }
        });
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(CategoryAddComponent) 

        this.modalRefAdd.onClose.subscribe((confirmed: boolean) => {
            this.getCategories();
            if (confirmed){
                this.addSuccessMessages('added');
            }
        })
    }

    openDeleteModal(categoryId: number){
        this.modalRefDelete = this.modalService.open(DeleteCategoryModalComponent) ;

        this.modalRefDelete.onClose.subscribe((confirmed: boolean) => {
            if (confirmed){
                this.deleteCategory(categoryId);
            }
        })
    }

    openEditModal(id: number){
        this.modalRefEdit = this.modalService.open(CategoryEditComponent, {
            data: {categoryId: id }
        }) 

        this.modalRefEdit.onClose.subscribe((confirmed: boolean) => {
            this.getCategories();
            if(confirmed){
                this.addSuccessMessages('edited');
            }
        })
    }

    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    addSuccessMessages(action: string) {
        this.messages = [
            { severity: 'success', summary: 'Success', detail: `You have ${action} the category.` }
        ]

        setTimeout(() => {
            this.messages = [];  // Clear the messages after 5 seconds
        }, 3000);
    }
}
