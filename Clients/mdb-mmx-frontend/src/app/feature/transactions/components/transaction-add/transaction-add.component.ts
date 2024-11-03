import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionType } from 'src/app/shared/models/enums';
import { ICategory } from 'src/app/shared/models/responses';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from 'src/app/feature/categories/categories.service';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrl: './transaction-add.component.scss'
})
export class TransactionAddComponent {
    public selectedTransacionType = 0;

    messages: Message[] | undefined;
    pageTitle: string = 'Add Transaction';
    categories: ICategory[] = [];
    expenseCategories: ICategory[] = [];
    incomeCategories: ICategory[] = [];
    transactionForm!: FormGroup;
    TransactionType = TransactionType;
    fromSpending: boolean = false;

    constructor(
        private transactionService: TransactionsService,
        private router: Router,
        private categoryService: CategoriesService,
        public modalRef: MdbModalRef<TransactionAddComponent>,
        private fb: FormBuilder,
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
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to load Category List')
            }
        });

        this.transactionForm.get('transactionType')?.valueChanges.subscribe({
            next: (type) =>{
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
                error: err =>{
                    this.addMessages(err?.error.Error || 'Failed to Add Transaction')
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
        this.transactionForm.reset();
        this.modalRef.close(true)
        if (this.fromSpending){
            this.router.navigate(['/transactions'])
        }
    }

    onCancel(){
        this.modalRef.close(false)
    }
}
