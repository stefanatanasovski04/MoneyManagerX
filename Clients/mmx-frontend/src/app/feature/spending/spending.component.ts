import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transactions/services/transaction.service';
import { switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-spending',
    templateUrl: './spending.component.html',
    styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit{
    income!: number;
    expense!: number;
    total!: number;

    public errorMessage = '';
    public error?: HttpErrorResponse;

    constructor(
        private transactionService: TransactionService,
    ){}

    ngOnInit(): void {
        this.updateValues();
    }

    updateValues(){
        this.transactionService.getTotalIncome().pipe(
            switchMap(response => {
                this.income = response;
                return this.transactionService.getTotalExpense();
            })
        ).subscribe({
            next: (response) => {
                this.expense = response
                this.total = this.income - this.expense;
            },
            error: error => {
                this.error = error;
                this.errorMessage = error.message;
            }
        })
    }   
}
