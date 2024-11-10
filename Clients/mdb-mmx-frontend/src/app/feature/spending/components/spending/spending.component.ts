import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Message } from 'primeng/api';
import { switchMap } from 'rxjs';
import { StatisticsService } from 'src/app/feature/statistics/statistics.service';
import { TransactionAddComponent } from 'src/app/feature/transactions/components/transaction-add/transaction-add.component';
import { ITotalByCategoryResponse } from 'src/app/shared/models/responses';

@Component({
    selector: 'app-spending',
    templateUrl: './spending.component.html',
    styleUrl: './spending.component.scss'
})
export class SpendingComponent {
    messages: Message[] | undefined;
    income!: number;
    expense!: number;
    total!: number;
    totalPerCategoryList!: ITotalByCategoryResponse[];
    modalRefAdd: MdbModalRef<TransactionAddComponent> | null = null;
    showSpinner: boolean = false;

    constructor(
        private modalService: MdbModalService,
        private statisticsService: StatisticsService,
    ){}

    ngOnInit(): void {
        this.updateValues();
        this.getTotalByCategory();
    }

    updateValues(){
        this.showSpinner = true;
        let isYearly = false;
        let currentMonth = new Date().toISOString().split('T')[0];
        this.statisticsService.getTotalIncome(currentMonth, isYearly).pipe(
            switchMap(response => {
                this.income = response;
                return this.statisticsService.getTotalExpense(currentMonth, isYearly);
            })
        ).subscribe({
            next: (response) => {
                this.expense = response
                this.total = this.income - this.expense;
                this.closeSpinner();
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to retreve Income or Expense');
                this.closeSpinner();
            }
        })
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(TransactionAddComponent, {
            data: {fromSpending: true }
        }) 
    }

    getTotalByCategory(){
        this.showSpinner = true;
        this.statisticsService.getTotalIncomePerCateogry(false).subscribe({
            next: response => {
                this.totalPerCategoryList = response;
                this.closeSpinner();
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to get the total per Category');
                this.closeSpinner();
            }
        })
    }

    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    closeSpinner(){
        setTimeout(() => {
            this.showSpinner = false;
        }, 50)
    }
}
