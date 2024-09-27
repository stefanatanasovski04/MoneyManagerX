import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriesModule } from './feature/categories/categories.module';
import { TransactionsModule } from './feature/transactions/transactions.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ErrorModalComponent } from './shared/components/error-components/error-modal/error-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './shared/components/error-components/error/error.component';
import { SharedModule } from './shared/shared.module';

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
    RouterModule.forRoot([
      {path:'', redirectTo:'categories',pathMatch:'full'},
      {path:'**', redirectTo:'categories', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
