import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ErrorComponent } from './components/error-components/error/error.component';
import { ErrorModalComponent } from './components/error-components/error-modal/error-modal.component';
import { RouterModule } from '@angular/router';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    NavBarComponent,
    ErrorComponent,
    ErrorModalComponent,
    DatepickerComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,  // Add this for the datepicker
    MatInputModule,       // Add this for the input control
    MatNativeDateModule,  // Add this for using native JavaScript date
    MatSelectModule, // Include MatSelectModule
  ],
  exports: [
    NavBarComponent,
    ErrorComponent,
    ErrorModalComponent,
    DatepickerComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
