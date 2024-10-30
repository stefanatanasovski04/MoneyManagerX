import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-period-dropdown',
  templateUrl: './period-dropdown.component.html',
  styleUrl: './period-dropdown.component.scss'
})
export class PeriodDropdownComponent {
    @Output() periodChosen: EventEmitter<boolean> = new EventEmitter();

    periodSelected(period: string){
        this.periodChosen.emit(period === 'yearly' ? true : false)
    }

    periods = [
      {value: 'yearly', viewValue: 'Yearly'},
      {value: 'monthly', viewValue: 'Monthly'},
    ];
}
