import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { IEnvelope } from 'src/app/shared/models/dtos';
import { IMonthlyIncomeExpenseDto, ITotalByCategoryResponse } from 'src/app/shared/models/responses';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
    private baseUrl = 'http://localhost:5000/api';

      constructor(private http: HttpClient) {}

      getTotalIncomePerCateogry(isYearly: boolean, currentMonth = new Date().toISOString().split('T')[0]) {
          return this.http.get<IEnvelope<ITotalByCategoryResponse[]>>(`${this.baseUrl}/categories/total-per-cateogry?month=${currentMonth}&yearly=${isYearly}`)
          .pipe(
              map(response => response.result),
              catchError(error => throwError(error))
          );
      }

      getYearlyIncomesAndExpensesPerMonth(year: number = new Date().getFullYear()) {
          return this.http.get<IEnvelope<IMonthlyIncomeExpenseDto[]>>(`${this.baseUrl}/statistics/yearly-income-expense?year=${year}`)
          .pipe(
              map(response => response.result),
              catchError(error => throwError(error))
          );
      }
}
