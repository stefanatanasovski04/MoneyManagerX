import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodDropdownComponent } from './components/period-dropdown/period-dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ReplaceCommaWithSpacePipe } from './pipes/replace-comma-with-space.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        NavBarComponent,
        DatepickerComponent,
        PeriodDropdownComponent,
        ReplaceCommaWithSpacePipe,
        FooterComponent
    ],
    imports: [
        CommonModule,
        MdbCollapseModule,
        MatDatepickerModule, 
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ModalModule,
        MessagesModule,
        ButtonModule,
        RippleModule,
        RouterLinkActive,
        RouterModule.forChild([])
    ],
    exports: [
        NavBarComponent,
        DatepickerComponent,
        PeriodDropdownComponent,
        ReplaceCommaWithSpacePipe,
        FooterComponent
    ],
    providers: [MessageService]
})
export class SharedModule { }
