import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CategoryType } from 'src/app/shared/models/enums';
import { IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { Router } from '@angular/router';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent implements OnInit {
    constructor(
        public modalRef: MdbModalRef<CategoryAddComponent>,
        private categoryService: CategoriesService,
        private fb: FormBuilder
    ) {}


      pageTitle: string = 'Add Category'
      public errorMessage = '';
      public error?: HttpErrorResponse;
      categoryForm!: FormGroup;
      icons: IIcon[] = [];
      public CategoryType = CategoryType;

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
              console.log(request);
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
        this.modalRef.close()
      }

      onCancel() {
          this.modalRef.close();
      }

}
