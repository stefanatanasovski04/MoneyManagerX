import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodDropdownComponent } from './components/period-dropdown/period-dropdown.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    NavBarComponent,
    DatepickerComponent,
    PeriodDropdownComponent,
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MatDatepickerModule, 
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavBarComponent,
    DatepickerComponent,
    PeriodDropdownComponent
  ]
})
export class SharedModule { }
