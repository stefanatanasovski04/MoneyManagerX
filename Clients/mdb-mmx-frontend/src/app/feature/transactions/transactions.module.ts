import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CommonModule } from '@angular/common';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';
@NgModule({
  declarations: [
    TransactionListComponent, 
    TransactionAddComponent,
    TransactionEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
        {path:'transactions', component:TransactionListComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class TransactionsModule { }
