import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { switchMap } from 'rxjs';
import { TransactionAddComponent } from 'src/app/feature/transactions/components/transaction-add/transaction-add.component';
import { TransactionsService } from 'src/app/feature/transactions/transactions.service';
import { SpendingService } from '../../spending.service';
import { ITotalByCategoryResponse } from 'src/app/shared/models/responses';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrl: './spending.component.scss'
})
export class SpendingComponent {
  income!: number;
  expense!: number;
  total!: number;
  totalPerCategoryList!: ITotalByCategoryResponse[];

  public errorMessage = '';
  public error?: HttpErrorResponse;
  modalRefAdd: MdbModalRef<TransactionAddComponent> | null = null;

  constructor(
      private transactionService: TransactionsService,
      private modalService: MdbModalService,
      private spendingService: SpendingService
  ){}

  ngOnInit(): void {
      this.updateValues();
      this.getTotalByCategory();
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
  openAddModal(){
      this.modalRefAdd = this.modalService.open(TransactionAddComponent, {
        data: {fromSpending: true }
    }) 
  }

  getTotalByCategory(){
      this.spendingService.getTotalIncome().subscribe({
          next: response => {
              this.totalPerCategoryList = response
              console.log(this.totalPerCategoryList)
          },
          error: error => {
              this.error = error;
              this.errorMessage = error.message;
        }
      })
  }
}
