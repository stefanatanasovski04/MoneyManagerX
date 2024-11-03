import { Component, EventEmitter, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
    selector: 'app-delete-category-modal',
    templateUrl: './delete-category-modal.component.html',
    styleUrl: './delete-category-modal.component.scss'
})
export class DeleteCategoryModalComponent {
    constructor(public modalRef: MdbModalRef<DeleteCategoryModalComponent>) {}
}
