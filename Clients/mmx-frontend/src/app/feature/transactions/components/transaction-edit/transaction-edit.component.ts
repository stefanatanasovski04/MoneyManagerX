import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICategory, ITransaction } from 'src/app/shared/models/responses';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from 'src/app/feature/categories/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionType } from 'src/app/shared/models/enums';
import { HttpErrorResponse } from '@angular/common/http';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {
    pageTitle: string = 'Edit Transaction';

    public errorMessage = '';
    public error?: HttpErrorResponse;
    
    transaction!: ITransaction | undefined;
    transactionForm!: FormGroup;
    sub!: Subscription;
    categories!: ICategory[];
    public TransactionType = TransactionType;


    constructor(
        private transactionService: TransactionService,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
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
            },
            error: err => {
                  this.error = err;
                  this.errorMessage = err.errorMessage;
            }
        });

        this.sub = this.route.paramMap.subscribe(
            params => {
                const id = Number(this.route.snapshot.paramMap.get('id'));
                this.transactionService.getTransactionById(id).subscribe({
                    next: response => {
                      this.transaction = response;
                      this.displayTransaction()
                    },
                    error: err => {
                        this.error = err;
                        this.errorMessage = err.errorMessage;
                    }
                })
        });
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
        this.router.navigate(['/transactions']);
    }

    onSaveComplete(): void {
        this.transactionForm.reset();
        this.router.navigate(['/transactions']);
    }
  
}
