import { Component } from '@angular/core';
import { TransactionsService } from '../../transactions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITransaction } from 'src/app/shared/models/responses';
import { TransactionType } from 'src/app/shared/models/enums';
import moment from 'moment';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { TransactionEditComponent } from '../transaction-edit/transaction-edit.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
    constructor(
        private transactionService: TransactionsService,
        private modalService: MdbModalService
    ){}

    public error?: HttpErrorResponse;
    public errorMessage = '';
    public transactions: ITransaction[] = [];
    public TransactionType = TransactionType;
    public currentDateChosen!: string;
    public isYearly!: boolean;
      
    modalRefAdd: MdbModalRef<TransactionAddComponent> | null = null;
    modalRefEdit: MdbModalRef<TransactionEditComponent> | null = null;


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
    openEditModal(id: number){
        this.modalRefEdit = this.modalService.open(TransactionEditComponent, {
            data: {transactionId: id }
        }) 

        this.modalRefEdit.onClose.subscribe(() => {
            this.getTransactions(this.isYearly, this.currentDateChosen);
        })
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(TransactionAddComponent) 

        this.modalRefAdd.onClose.subscribe(() => {
            this.getTransactions(this.isYearly, this.currentDateChosen)
        })
    }
}
