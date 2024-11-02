import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
    constructor(private messageService: MessageService, private errorService: ErrorService) {}
    presentError = false;
    ngOnInit(): void {
        this.errorService.error$.subscribe(message => {
            this.showError(message);
            this.presentError = true
        });
    }

    showError(message: string) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}