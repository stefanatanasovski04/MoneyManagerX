import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-statistics-main',
    templateUrl: './statistics-main.component.html',
    styleUrl: './statistics-main.component.scss'
})
export class StatisticsMainComponent implements OnInit{
    messages: Message[] | undefined;
    showSpinner: boolean = true;

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => {this.showSpinner = false;}, 50)
    }
    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    handleError(error: HttpErrorResponse) {
        this.addMessages(error?.error.Error || 'Failed to retreve Income or Expense')
    }
}
