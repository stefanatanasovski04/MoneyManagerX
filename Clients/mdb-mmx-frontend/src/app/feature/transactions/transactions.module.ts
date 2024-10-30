import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CommonModule } from '@angular/common';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    TransactionListComponent, 
    TransactionAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
        {path:'transactions', component:TransactionListComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class TransactionsModule { }
