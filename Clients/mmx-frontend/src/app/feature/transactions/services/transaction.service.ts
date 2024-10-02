import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { IEnvelope, IListResult, ITypeResult } from 'src/app/shared/models/models';
import { IAddTransactionRequest } from 'src/app/shared/models/requests';
import { ITransaction } from 'src/app/shared/models/responses';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseUrl = 'http://localhost:5000/api'; // Adjust the URL as necessary
    
    constructor(private http: HttpClient) {}

    getTransactionsList(yearly: boolean, month: string) {
        return this.http.get<IEnvelope<IListResult<ITransaction>>>(`${this.baseUrl}/transactions?yearly=${yearly}&month=${month}`)
            .pipe(
                map(response => response.result),
                catchError(error => throwError(error))
            );
    }

    getTransactionById(id: number) {
        return this.http.get<IEnvelope<ITransaction>>(`${this.baseUrl}/transactions/${id}`)
            .pipe(
                map(response => response.result),
                catchError(error => throwError(error))
            );
    }

    createTransaction(request: IAddTransactionRequest) {
        return this.http.post<IEnvelope<void>>(`${this.baseUrl}/transactions`, request)
            .pipe(
                catchError(error => throwError(error))
            )
    }

    updateTransaction(request: IAddTransactionRequest, id:number) {
        return this.http.put<IEnvelope<void>>(`${this.baseUrl}/transactions/${id}`, request)
            .pipe(
                catchError(error => throwError(error))
            )
    }

    deleteTransaction(id: number) {
        return this.http.delete<IEnvelope<void>>(`${this.baseUrl}/transactions/${id}`)
            .pipe(
                map((response: IEnvelope<void>) => response.result),
                catchError(error => throwError(error))            
            );
    }

    getTotalExpense() {
        return this.http.get<IEnvelope<ITypeResult<number>>>(`${this.baseUrl}/transactions/expense?date=2024-10-03`)
            .pipe(
                map(response => response.result.result),
                catchError(error => throwError(error))
            );
    }
      getTotalIncome() {
            return this.http.get<IEnvelope<ITypeResult<number>>>(`${this.baseUrl}/transactions/income?date=2024-10-03`)
            .pipe(
                map(response => response.result.result),
                catchError(error => throwError(error))
            );
      }
}
