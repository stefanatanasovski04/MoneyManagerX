import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionType } from 'src/app/shared/models/enums';
import { ICategory } from 'src/app/shared/models/responses';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from 'src/app/feature/categories/categories.service';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrl: './transaction-add.component.scss'
})
export class TransactionAddComponent {
    pageTitle: string = 'Add Transaction';
    categories: ICategory[] = [];
    expenseCategories: ICategory[] = [];
    incomeCategories: ICategory[] = [];
    public selectedTransacionType = 0;
    transactionForm!: FormGroup;
    TransactionType = TransactionType;

    public error?: HttpErrorResponse;
    public errorMessage = '';

    constructor(
        private transactionService: TransactionsService,
        private categoryService: CategoriesService,
        public modalRef: MdbModalRef<TransactionAddComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.transactionForm = this.fb.group({
            transactionType: 0,
            transactionDate: "",
            transactionTime: "",
            categoryId: null,
            transactionAmount:"",
            name:""
        })

        this.categoryService.getCategoriesList().subscribe({
            next: response => {
                this.categories = response.list; 
                this.incomeCategories = this.categories.filter(x => x.type == 1);
                this.expenseCategories = this.categories.filter(x => x.type == 0);

            },
            error: error => {
                this.error = error,
                this.errorMessage = error.errorMessage
            }
        });

        console.log(this.expenseCategories);

        this.transactionForm.get('transactionType')?.valueChanges.subscribe({
            next: (type) =>{
                console.log(type);
                this.selectedTransacionType = Number(type);
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
        this.modalRef.close()
    }

    onSaveComplete(): void {
        this.transactionForm.reset();
        this.modalRef.close()
    }
}
