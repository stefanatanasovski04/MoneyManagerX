import {Component, EventEmitter, OnInit, Output} from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Output() periodChosen: EventEmitter<boolean> = new EventEmitter();

  periodSelected(period: string){
      this.periodChosen.emit(period === 'yearly' ? true : false)
  }

  periods = [
    {value: 'yearly', viewValue: 'Yearly'},
    {value: 'monthly', viewValue: 'Monthly'},
  ];
}
