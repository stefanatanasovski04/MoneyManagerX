import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { RouterModule } from '@angular/router';
import { TRANSACTION_ROUTES } from 'src/app/shared/models/routes';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';



@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(TRANSACTION_ROUTES)
  ]
})
export class TransactionsModule { }
