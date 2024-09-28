import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriesModule } from './feature/categories/categories.module';
import { TransactionsModule } from './feature/transactions/transactions.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DEFAULT_ROUTES } from './shared/models/routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CategoriesModule,
    TransactionsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(DEFAULT_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
