import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import moment from 'moment';  // This is the corrected import
import { Moment } from 'moment';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
      },
  
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class DatepickerComponent implements OnInit{

    @Output() dateChosen: EventEmitter<Date> = new EventEmitter<Date>();
    public date = new FormControl(moment());
    
    ngOnInit(): void {
        this.dateChosen.emit(new Date());
    }
    
    setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue?.month(normalizedMonthAndYear.month());
        ctrlValue?.year(normalizedMonthAndYear.year());
        this.date.setValue(ctrlValue);
        this.dateChosen.emit(ctrlValue?.toDate());
        datepicker.close();
    }
}