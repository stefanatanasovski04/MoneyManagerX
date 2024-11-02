import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-statistics-main',
    templateUrl: './statistics-main.component.html',
    styleUrl: './statistics-main.component.scss'
})
export class StatisticsMainComponent {
    constructor(private errorService: ErrorService) {}

    handleError(error: HttpErrorResponse) {
        this.errorService.showError(error?.error.Error || 'Failed to load the statistics'); 
    }
}
