import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingComponent } from './components/spending/spending.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from "../../shared/shared.module";
import { MessagesModule } from 'primeng/messages';

@NgModule({
    declarations: [
        SpendingComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MessagesModule,
        RouterModule.forChild([
            { path: 'spending', component: SpendingComponent },
        ]),
    ],
    providers: [provideHttpClient()]
})
export class SpendingModule { }
