import { Component } from '@angular/core';
import { TransactionsService } from '../../transactions.service';
import { ITransaction } from 'src/app/shared/models/responses';
import { TransactionType } from 'src/app/shared/models/enums';
import moment from 'moment';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { TransactionEditComponent } from '../transaction-edit/transaction-edit.component';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
    public transactions: ITransaction[] = [];
    public TransactionType = TransactionType;
    public currentDateChosen!: string;
    public isYearly!: boolean;
    messages: Message[] | undefined;
      
    modalRefAdd: MdbModalRef<TransactionAddComponent> | null = null;
    modalRefEdit: MdbModalRef<TransactionEditComponent> | null = null;

    constructor(
        private transactionService: TransactionsService,
        private modalService: MdbModalService
    ){}

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
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to Load Transactions')
            }
        })
    }

    deleteTransaction(transactionId: number){
        this.transactionService.deleteTransaction(transactionId).subscribe({
            next: () => {
                this.getTransactions(this.isYearly, this.currentDateChosen)
            },
            error: err => {  
                this.addMessages(err?.error.Error || 'Failed to Delete Transaction')
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

    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }
}
