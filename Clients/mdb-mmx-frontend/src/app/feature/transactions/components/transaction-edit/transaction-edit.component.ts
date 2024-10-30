import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionType } from 'src/app/shared/models/enums';
import { ICategory, ITransaction } from 'src/app/shared/models/responses';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from 'src/app/feature/categories/categories.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.scss'
})
export class TransactionEditComponent {
  pageTitle: string = 'Edit Transaction';

  public errorMessage = '';
  public error?: HttpErrorResponse;
  
  transaction!: ITransaction | undefined;
  transactionForm!: FormGroup;
  categories!: ICategory[];
  expenseCategories: ICategory[] = [];
  incomeCategories: ICategory[] = [];
  public selectedTransacionType = 0;
  transactionId!: number;

  public TransactionType = TransactionType;


  constructor(
      private transactionService: TransactionsService,
      private categoryService: CategoriesService,
      public modalRef: MdbModalRef<TransactionEditComponent>,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      this.transactionForm = this.fb.group({
        transactionType: TransactionType.Expense,
        transactionDate: "",
        transactionTime: "",
        categoryId: null,
        transactionAmount: "",
        name: "",
      });

      this.categoryService.getCategoriesList().subscribe({
          next: response => {
              this.categories = response.list;
              this.incomeCategories = this.categories.filter(x => x.type == 1);
              this.expenseCategories = this.categories.filter(x => x.type == 0);
          },
          error: err => {
                this.error = err;
                this.errorMessage = err.errorMessage;
          }
       });

       console.log(this.expenseCategories);

        this.transactionForm.get('transactionType')?.valueChanges.subscribe({
            next: (type) =>{
                console.log(type);
                this.selectedTransacionType = Number(type);
            }
        });

      
        this.transactionService.getTransactionById(this.transactionId).subscribe({
            next: response => {
            this.transaction = response;
            this.displayTransaction()
            },
            error: err => {
                this.error = err;
                this.errorMessage = err.errorMessage;
            }
        })
  }

  displayTransaction() {
      if (this.transactionForm) {
          this.transactionForm.reset();
      }
  
      // Update data on the form
      this.transactionForm.patchValue({
          transactionType: this.transaction?.type,
          transactionDate: this.transaction?.transactionDate,
          transactionTime: this.transaction?.transactionTime,
          categoryId: this.transaction?.category.id,
          transactionAmount: Number(this.transaction?.amount),
          name: this.transaction?.name
      });
  }

  saveTransaction(): void {
      if(this.transactionForm.valid){
          let request: IAddTransactionRequest = {
              name: this.transactionForm.value.name,
              categoryFk: Number(this.transactionForm.value.categoryId),
              type: Number(this.transactionForm.value.transactionType),
              transactionDate: this.transactionForm.value.transactionDate,
              transactionTime: this.transactionForm.value.transactionTime as Time,
              amount: Number(this.transactionForm.value.transactionAmount),
          }

          this.transactionService.updateTransaction(request, this.transaction!.id).subscribe({
              next: () => this.onSaveComplete(),
              error: error =>{
                  this.error = error;
                  this.errorMessage = error.errorMessage;
              }
          });
      }
  }

    onCancel() {
        this.modalRef.close();
    }

  onSaveComplete(): void {
    this.transactionForm.reset();
    this.modalRef.close()
  }
}
