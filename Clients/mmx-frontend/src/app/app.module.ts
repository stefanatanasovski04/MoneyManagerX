import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriesModule } from './feature/categories/categories.module';
import { TransactionsModule } from './feature/transactions/transactions.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CategoriesModule,
    TransactionsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', redirectTo:'categories',pathMatch:'full'},
      {path:'**', redirectTo:'categories', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
