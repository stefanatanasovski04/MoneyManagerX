import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFormsModule,
    RouterModule.forChild([
        {path:'transactions', component:TransactionListComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class TransactionsModule { }
