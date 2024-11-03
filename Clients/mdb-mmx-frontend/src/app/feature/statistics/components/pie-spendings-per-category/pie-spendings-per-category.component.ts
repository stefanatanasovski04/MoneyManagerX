import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITotalByCategoryResponse } from 'src/app/shared/models/responses';
import { COLOR_LIST, HOVER_COLOR_LIST } from 'src/app/shared/models/static-variables';
import { StatisticsService } from '../../statistics.service';

@Component({
    selector: 'app-pie-spendings-per-category',
    templateUrl: './pie-spendings-per-category.component.html',
    styleUrl: './pie-spendings-per-category.component.scss'
})
export class PieSpendingsPerCategoryComponent implements OnInit{
    @Output() errorOccurred = new EventEmitter<HttpErrorResponse>();
    @Input() yearly: boolean;

    totalPerCategoryList!: ITotalByCategoryResponse[];
    chartLabels: string[] = [];
    chartAmounts: number[] = [];
    data: any;
    options: any;

    constructor(private statisticService: StatisticsService){}

    ngOnInit() {
        this.getTotalByCategory();
    }

    getTotalByCategory(){
        this.statisticService.getTotalIncomePerCateogry(this.yearly).subscribe({
            next: response => {
                this.totalPerCategoryList = response
                this.totalPerCategoryList.forEach(x => {
                    this.chartLabels.push(x.category.name);
                    this.chartAmounts.push(x.total);
                });
                this.setupChart();
            },
            error: error => this.errorOccurred.emit(error)
        })
    }

    setupChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: this.chartLabels,
            datasets: [
                {
                    data: this.chartAmounts,
                    backgroundColor: COLOR_LIST,
                    hoverBackgroundColor: HOVER_COLOR_LIST
                }
            ]
        };

        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        }; 
    }
}
