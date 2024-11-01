import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SpendingService } from 'src/app/feature/spending/spending.service';
import { ITotalByCategoryResponse } from 'src/app/shared/models/responses';
import { COLOR_LIST, HOVER_COLOR_LIST } from 'src/app/shared/models/static-variables';

@Component({
  selector: 'app-pie-spendings-per-category',
  templateUrl: './pie-spendings-per-category.component.html',
  styleUrl: './pie-spendings-per-category.component.scss'
})
export class PieSpendingsPerCategoryComponent {
    constructor(private statisticService: SpendingService){}
    @Input() yearly: boolean;
    public errorMessage = '';
    public error?: HttpErrorResponse;
    totalPerCategoryList!: ITotalByCategoryResponse[];
    chartLabels: string[] = [];
    chartAmounts: number[] = [];

    data: any;
    options: any;

    ngOnInit() {
        this.getTotalByCategory();
        console.log(this.data);
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
            error: error => {
                this.error = error;
                this.errorMessage = error.message;
          }
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
