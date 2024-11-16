import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionType } from 'src/app/shared/models/enums';
import { ICategory, ITransaction } from 'src/app/shared/models/responses';
import { TransactionsService } from '../../transactions.service';
import { CategoriesService } from 'src/app/feature/categories/categories.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { Time } from '@angular/common';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrl: './transaction-edit.component.scss'
})
export class TransactionEditComponent {
    public selectedTransacionType = 0;
    public TransactionType = TransactionType;

    messages: Message[] | undefined;
    pageTitle: string = 'Edit Transaction';
    transaction!: ITransaction | undefined;
    transactionForm!: FormGroup;
    categories!: ICategory[];
    expenseCategories: ICategory[] = [];
    incomeCategories: ICategory[] = [];
    transactionId!: number;
    showSpinner: boolean = false;

    constructor(
        private transactionService: TransactionsService,
        private categoryService: CategoriesService,
        public modalRef: MdbModalRef<TransactionEditComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.showSpinner = true;
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
                this.addMessages(err?.error.Error || 'Failed to load Category List')
            },
            complete: () => this.closeSpinner()
        });

        this.transactionForm.get('transactionType')?.valueChanges.subscribe({
            next: (type) =>{
                this.selectedTransacionType = Number(type);
            }
        });

      
        this.transactionService.getTransactionById(this.transactionId).subscribe({
            next: response => {
                this.transaction = response;
                this.displayTransaction()
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to load Transaction')
            },
            complete: () => this.closeSpinner()
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
                error: err =>{
                    this.addMessages(err?.error.Error || 'Failed to Edit Transaction')
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
    }

    onCancel() {
        this.modalRef.close(false);
    }

    closeSpinner(){
        setTimeout(() => this.showSpinner = false, 300)
    }
}
