import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IEnvelope, IListResult } from 'src/app/shared/models/dtos';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { ICategory, IIcon } from 'src/app/shared/models/responses';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private baseUrl = 'http://localhost:5000/api'; // Adjust the URL as necessary

    constructor(private http: HttpClient) { }

    getCategoriesList(): Observable<any> {
        return this.http.get<IEnvelope<IListResult<ICategory>>>(`${this.baseUrl}/categories`)
            .pipe(
                map(response => response.result),
                catchError(error => throwError(error))
            );
    }

    getCategoryById(categoryId: number): Observable<any> {
        return this.http.get<IEnvelope<ICategory>>(`${this.baseUrl}/categories/${categoryId}`)
            .pipe(
                map(response => response.result),
                catchError(error => throwError(error))
            );
    }

    deleteCategory(id: number) {
        return this.http.delete<IEnvelope<void>>(`${this.baseUrl}/categories/${id}`)
            .pipe(
                map((response: IEnvelope<void>) => response.result),
                catchError(error => throwError(error))            
            );
    }

    getIcons() {
        return this.http.get<IEnvelope<IIcon[]>>(`${this.baseUrl}/categories/icons`)
            .pipe(
                map(response => response.result),
                catchError(error => throwError(error))
            );
    }

    createCategory(request: IAddCategoryRequest) {
        return this.http.post<IEnvelope<void>>(`${this.baseUrl}/categories`, request)
            .pipe(
                catchError(error => throwError(error)),
            );
    } 

    updateCategory(categoryId: number, request: IAddCategoryRequest) {
        return this.http.put<IEnvelope<void>>(`${this.baseUrl}/categories/${categoryId}`, request)
            .pipe(
                catchError(error => throwError(error)),
            );
    }
}
