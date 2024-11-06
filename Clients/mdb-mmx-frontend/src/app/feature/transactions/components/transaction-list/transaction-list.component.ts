import { Component } from '@angular/core';
import { TransactionsService } from '../../transactions.service';
import { ITransaction } from 'src/app/shared/models/responses';
import { TransactionType } from 'src/app/shared/models/enums';
import moment from 'moment';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { TransactionEditComponent } from '../transaction-edit/transaction-edit.component';
import { Message } from 'primeng/api';
import { DeleteTransactionModalComponent } from '../delete-transaction-modal/delete-transaction-modal.component';

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
    modalRefDelete: MdbModalRef<DeleteTransactionModalComponent> | null = null;
    newDateChosen: Date = new Date();
    progressLeftPercentage: string = 60+'%';
    progressRightPercentage: string = 40+'%';

    constructor(
        private transactionService: TransactionsService,
        private modalService: MdbModalService
    ){}

    ngOnInit(): void {
        this.currentDateChosen = moment(new Date()).format('YYYY-MM-DD');
        this.isYearly = false;
        this.getTransactions(this.isYearly, this.currentDateChosen);
    }

    onNewDateSelected($event: Date){
        this.currentDateChosen = moment($event).format('YYYY-MM-DD');
        this.getTransactions(this.isYearly, this.currentDateChosen );
    }

    onPeriodChosen(yearly: boolean){
        this.isYearly = yearly;
        this.getTransactions(this.isYearly, this.currentDateChosen)
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

    openDeleteModal(transactionId: number){
        this.modalRefDelete = this.modalService.open(DeleteTransactionModalComponent) ;

        this.modalRefDelete.onClose.subscribe((confirmed: boolean) => {
            if (confirmed){
                this.deleteTransaction(transactionId);
                this.addSuccessMessages('deleted');
            }
        })
    }
    
    openEditModal(id: number){
        this.modalRefEdit = this.modalService.open(TransactionEditComponent, {
            data: {transactionId: id }
        }) 

        this.modalRefEdit.onClose.subscribe((confirmed: boolean) => {
            this.getTransactions(this.isYearly, this.currentDateChosen);
            if(confirmed){
                this.addSuccessMessages('edited');
            }
        })
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(TransactionAddComponent) 

        this.modalRefAdd.onClose.subscribe((confirmed: boolean) => {
            this.getTransactions(this.isYearly, this.currentDateChosen)
            if(confirmed){
                this.addSuccessMessages('added');
            }
        })
    }

    addMessages(errorMessage: string) {
        this.messages = [];
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    addSuccessMessages(action: string) {
        this.messages = [];
        this.messages = [
            { severity: 'success', summary: 'Success', detail: `You have ${action} the transaction.` }
        ]

        setTimeout(() => {
            this.messages = [];  // Clear the messages after 5 seconds
        }, 3000);
    }
}
