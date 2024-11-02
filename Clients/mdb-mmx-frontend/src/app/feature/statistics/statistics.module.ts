import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsMainComponent } from './components/statistics-main/statistics-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { PieSpendingsPerCategoryComponent } from './components/pie-spendings-per-category/pie-spendings-per-category.component';
import { LineGraphYealyIncomesExpensesComponent } from './components/line-graph-yealy-incomes-expenses/line-graph-yealy-incomes-expenses.component';

@NgModule({
    declarations: [
        StatisticsMainComponent,
        PieSpendingsPerCategoryComponent,
        LineGraphYealyIncomesExpensesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CalendarModule,
        ReactiveFormsModule,
        FormsModule,
        ChartModule,
        RouterModule.forChild([
            {path:'statistics', component:StatisticsMainComponent},
        ])
    ],
    providers: [provideHttpClient()]
})
export class StatisticsModule { }
