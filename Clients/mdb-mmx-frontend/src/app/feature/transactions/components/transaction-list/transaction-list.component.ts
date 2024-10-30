import { Component } from '@angular/core';
import { TransactionsService } from '../../transactions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITransaction } from 'src/app/shared/models/responses';
import { TransactionType } from 'src/app/shared/models/enums';
import moment from 'moment';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  constructor(private transactionService: TransactionsService){}

    public error?: HttpErrorResponse;
    public errorMessage = '';
    public transactions: ITransaction[] = [];
    public TransactionType = TransactionType;
    public currentDateChosen!: string;
    public isYearly!: boolean;

    ngOnInit(): void {
        this.currentDateChosen = moment(new Date()).format('YYYY-MM-DD');
        this.isYearly = false;
        this.getTransactions(true, this.currentDateChosen);
    }

    dateHasBeenChosen($event: Date) {
        this.currentDateChosen = moment($event).format('YYYY-MM-DD');
        this.getTransactions(this.isYearly, this.currentDateChosen );
    }

    onPeriodChosen($event: boolean){
        this.isYearly = $event;
        this.getTransactions($event, this.currentDateChosen);
    }

    getTransactions(yearly: boolean, month: string){
        this.transactionService.getTransactionsList(yearly, month).subscribe({
            next: response => {
                this.transactions = response.list;
            },
            error: error => {
                this.error = error;
                this.errorMessage = error.errorMessage;
            }
        })
    }

    deleteTransaction(transactionId: number){
        this.transactionService.deleteTransaction(transactionId).subscribe({
            next: () => {
                this.getTransactions(this.isYearly, this.currentDateChosen)
            },
            error: err => {  
                this.error = err;
                this.errorMessage = err.errorMessage;
            }
        })
    }
    openEditModal(transactionId: number){

    }
}
