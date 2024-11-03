import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
    selector: 'app-delete-transaction-modal',
    templateUrl: './delete-transaction-modal.component.html',
    styleUrl: './delete-transaction-modal.component.scss'
})
export class DeleteTransactionModalComponent {
    constructor(public modalRef: MdbModalRef<DeleteTransactionModalComponent>) {}
}
