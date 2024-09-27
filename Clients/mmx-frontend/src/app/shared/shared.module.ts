import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ErrorComponent } from './components/error-components/error/error.component';
import { ErrorModalComponent } from './components/error-components/error-modal/error-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent,
    ErrorComponent,
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    ErrorComponent,
    ErrorModalComponent
  ]
})
export class SharedModule { }
