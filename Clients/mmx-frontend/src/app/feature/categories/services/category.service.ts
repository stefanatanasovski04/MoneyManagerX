import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoryType } from 'src/app/shared/models/enums';
import { IEnvelope, IListResult } from 'src/app/shared/models/models';
import { ICategory } from 'src/app/shared/models/responses';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
  
  private baseUrl = 'http://localhost:5000/api'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

    getCategoriesList(): Observable<any> {
        return this.http.get<IEnvelope<IListResult<ICategory>>>(`${this.baseUrl}/categories?type=${CategoryType.Income}`)
            .pipe(
              map(response => response.result),
              catchError(error => throwError(() => {
                new Error(error);
              }))
            );
    }

    deleteCategory(id: number) {
        return this.http.delete<IEnvelope<void>>(`${this.baseUrl}/categories/${id}`)
            .pipe(
                map((response: IEnvelope<void>) => response.result),
                catchError(error => throwError(error))
            );

    }
}
