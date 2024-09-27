import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IconSize } from 'src/app/shared/models/enums';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html'
})
export class ErrorModalComponent {
    @Input() error: HttpErrorResponse | null = null;
    @Input() errorMessage = '';
    @Input() displayHeader = true;
    public IconSize = IconSize;

    constructor(public bsModalRef: BsModalRef) { }
}
