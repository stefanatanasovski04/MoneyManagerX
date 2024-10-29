import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryType } from 'src/app/shared/models/enums';
import { ICategory, IIcon } from 'src/app/shared/models/responses';
import { CategoriesService } from '../../categories.service';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<CategoryEditComponent>,
    private categoryService: CategoriesService,
    private fb: FormBuilder
  ){}

  pageTitle: string = 'Edit Category'
  public errorMessage = '';
  public error?: HttpErrorResponse;
  categoryForm!: FormGroup;
  icons: IIcon[] = [];
  public CategoryType = CategoryType;

  public category!: ICategory | undefined;
  categoryId!: number;

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
                console.log(err);
                this.error = err;
                this.errorMessage = err.errorMessage;
            } 
        })

        this.categoryService.getCategoryById(this.categoryId).subscribe({
            next: response => {
                this.category = response;
                this.displayCategory()
            },
            error: err => {
                this.error = err;
                this.errorMessage = err.errorMessage;
            }
        })
    }

  displayCategory(){
      if(this.categoryForm){
          this.categoryForm.reset();
      }
      // Update the data on the form
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

          console.log(`Id: ${this.category.id}`)
          console.log(request)
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

    onSaveComplete(): void {
        this.categoryForm.reset();
        this.modalRef.close()
    }

    onCancel(){
        this.modalRef.close();
    }
}
