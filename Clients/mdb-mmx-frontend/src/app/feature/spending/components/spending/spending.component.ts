import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { switchMap } from 'rxjs';
import { StatisticsService } from 'src/app/feature/statistics/statistics.service';
import { TransactionAddComponent } from 'src/app/feature/transactions/components/transaction-add/transaction-add.component';
import { TransactionsService } from 'src/app/feature/transactions/transactions.service';
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
      private statisticsService: StatisticsService
  ){}

  ngOnInit(): void {
      this.updateValues();
      this.getTotalByCategory();
  }

  updateValues(){
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
      this.statisticsService.getTotalIncomePerCateogry(false).subscribe({
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
