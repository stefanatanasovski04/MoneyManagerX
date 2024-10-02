import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/responses';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from 'src/app/feature/categories/services/category.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';
import { TransactionType } from 'src/app/shared/models/enums';

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit{
    pageTitle: string = 'Add Transaction';
    categories!: ICategory[];
    transactionForm!: FormGroup;
    TransactionType = TransactionType;

    public error?: HttpErrorResponse;
    public errorMessage = '';

    constructor(
        private transactionService: TransactionService,
        private categoryService: CategoryService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.transactionForm = this.fb.group({
            transactionType: null,
            transactionDate: "",
            transactionTime: "",
            categoryId: null,
            transactionAmount:"",
            name:""
        })
  
        this.categoryService.getCategoriesList().subscribe({
            next: response => {
                this.categories = response.list; 
            },
            error: error => {
                this.error = error,
                this.errorMessage = error.errorMessage
            }
        });
    }

    saveTransaction(){
        if(this.transactionForm.valid){
            let request: IAddTransactionRequest = {
                name: this.transactionForm.value.name,
                categoryFk: Number(this.transactionForm.value.categoryId),
                type: Number(this.transactionForm.value.transactionType),
                transactionDate: this.transactionForm.value.transactionDate,
                transactionTime: this.transactionForm.value.transactionTime as Time,
                amount: Number(this.transactionForm.value.transactionAmount),
            }

            this.transactionService.createTransaction(request).subscribe({
                next: () => this.onSaveComplete(),
                error: error =>{
                    this.error = error;
                    this.errorMessage = error.errorMessage;
                }
            });
        }
    }

    onCancel(){
        this.router.navigate(['/transactions']);
    }

    onSaveComplete(): void {
        this.transactionForm.reset();
        this.router.navigate(['/transactions'])
    }
}
