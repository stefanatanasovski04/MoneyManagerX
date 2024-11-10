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
import { StatisticsService } from 'src/app/feature/statistics/statistics.service';
import { switchMap } from 'rxjs';

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
    showSpinner: boolean = false;
    showTableSpinner: boolean = false;
    progressLeftPercentage: string;
    progressRightPercentage: string;
    totalIncome: number = 53000;
    totalExpense: number = 40860;

    constructor(
        private transactionService: TransactionsService,
        private modalService: MdbModalService,
        private statisticsService: StatisticsService
    ){}

    ngOnInit(): void {
        this.currentDateChosen = moment(new Date()).format('YYYY-MM-DD');
        this.isYearly = false;
        this.getTransactions(this.isYearly, this.currentDateChosen, true)
    }

    onNewDateSelected($event: Date){
        this.currentDateChosen = moment($event).format('YYYY-MM-DD');
        this.getTransactions(this.isYearly, this.currentDateChosen, true);
    }

    onPeriodChosen(yearly: boolean){
        this.isYearly = yearly;
        this.getTransactions(this.isYearly, this.currentDateChosen, true)
    }

    getTransactions(yearly: boolean, month: string, spin: boolean){
        this.showSpinner = spin;
        this.showTableSpinner = !spin;
        this.transactionService.getTransactionsList(yearly, month).subscribe({
            next: response => {
                this.transactions = response.list;
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to Load Transactions')
            },
            complete: () => {
                this.setProgressBar()
                this.closeSpinner();
                this.closeTableSpinner();
            }
        })
    }

    deleteTransaction(transactionId: number){
        this.transactionService.deleteTransaction(transactionId).subscribe({
            next: () => {
                this.getTransactions(this.isYearly, this.currentDateChosen, false)
            },
            error: err => {  
                this.addMessages(err?.error.Error || 'Failed to Delete Transaction')
            }
        })
    }

    setProgressBar(){
        this.statisticsService.getTotalIncome(this.currentDateChosen, this.isYearly).pipe(
            switchMap(response => {
                this.totalIncome = response;
                return this.statisticsService.getTotalExpense(this.currentDateChosen, this.isYearly);
            })
        ).subscribe({
            next: (response) => {
                this.totalExpense = response
                this.calculatePercentageForProgressBar()
            },
            error: err => {
                this.addMessages(err?.error.Error || 'Failed to retreve Income or Expense');
            }
        })
    }

    calculatePercentageForProgressBar(){
        let total = this.totalIncome + this.totalExpense;
        
        if (total === 0){
            this.progressLeftPercentage = this.progressRightPercentage = 50+'%';
        }else{
            let incomePercentage = (this.totalIncome / total) * 100;
            let expensePercentage = 100 - incomePercentage;
            this.progressLeftPercentage = incomePercentage+'%';
            this.progressRightPercentage = expensePercentage+'%';
        }
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
            this.getTransactions(this.isYearly, this.currentDateChosen, false);
            if(confirmed){
                this.addSuccessMessages('edited');
            }
        })
    }

    openAddModal(){
        this.modalRefAdd = this.modalService.open(TransactionAddComponent) 

        this.modalRefAdd.onClose.subscribe((confirmed: boolean) => {
            this.getTransactions(this.isYearly, this.currentDateChosen, false)
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

    closeSpinner(){
        setTimeout(() => this.showSpinner = false, 50)
    }

    closeTableSpinner(){
        setTimeout(() => this.showTableSpinner = false, 200)
    }
}
