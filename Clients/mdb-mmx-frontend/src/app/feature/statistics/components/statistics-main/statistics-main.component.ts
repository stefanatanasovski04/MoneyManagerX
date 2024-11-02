import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-statistics-main',
    templateUrl: './statistics-main.component.html',
    styleUrl: './statistics-main.component.scss'
})
export class StatisticsMainComponent {
    messages: Message[] | undefined;

    constructor(private errorService: ErrorService) {}

    addMessages(errorMessage: string) {
        this.messages = [
            { severity: 'error', summary: errorMessage }
        ];
    }

    handleError(error: HttpErrorResponse) {
        this.addMessages(error?.error.Error || 'Failed to retreve Income or Expense')
    }
}
