import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit{
    constructor(private messageService: MessageService, private errorService: ErrorService) {}

    ngOnInit(): void {
        this.errorService.error$.subscribe(message => {
            this.showError(message);
        });
    }

    showError(message: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}