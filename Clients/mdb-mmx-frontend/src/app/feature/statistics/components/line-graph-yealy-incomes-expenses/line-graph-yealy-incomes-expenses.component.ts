import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatisticsService } from '../../statistics.service';
import { IMonthlyIncomeExpenseDto } from 'src/app/shared/models/responses';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-line-graph-yealy-incomes-expenses',
    templateUrl: './line-graph-yealy-incomes-expenses.component.html',
    styleUrl: './line-graph-yealy-incomes-expenses.component.scss'
})
export class LineGraphYealyIncomesExpensesComponent implements OnInit{
    @Output() errorOccurred = new EventEmitter<HttpErrorResponse>();

    monthlyIncomeExpensesList: IMonthlyIncomeExpenseDto[] = [];
    months: string[] = [];
    incomesPerMonth: number[] = [];
    expensesPerMonth: number[] = [];
    data: any;
    options: any;

    constructor(private statisticsService: StatisticsService){}

    ngOnInit(): void {
        this.statisticsService.getYearlyIncomesAndExpensesPerMonth().subscribe({
            next: response => {
                this.monthlyIncomeExpensesList = response,
                this.monthlyIncomeExpensesList.forEach(
                    x => {
                        this.months.push(x.month);
                        this.incomesPerMonth.push(x.income);
                        this.expensesPerMonth.push(x.expense);
                    }
                )
                this.setupChart();
            },
            error: error => this.errorOccurred.emit(error)
        })
    }

    setupChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this.months,
            datasets: [
                {
                    label: 'Income',
                    data: this.incomesPerMonth,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4
                },
                {
                    label: 'Expense',
                    data: this.expensesPerMonth,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
