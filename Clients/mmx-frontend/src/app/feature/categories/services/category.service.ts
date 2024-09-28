import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CategoryType } from 'src/app/shared/models/enums';
import { IEnvelope, IListResult } from 'src/app/shared/models/models';
import { IAddCategoryRequest } from 'src/app/shared/models/requests';
import { ICategory, IIcon } from 'src/app/shared/models/responses';

@Injectable({
    providedIn: 'root'
})
export class CategoryService { 
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

    // icons: IIcon[] = [ // get from back-end
    //   {
    //     id: 11,
    //     photoUrl: 'assets/icons/icons8-bill-96.png'
    //   },
    //   {
    //     id: 1,
    //     photoUrl: 'assets/icons/icons8-bread-96.png'
    //   },
    //   {
    //     id: 2,
    //     photoUrl: 'assets/icons/icons8-candy-96.png'
    //   },
    //   {
    //     id: 3,
    //     photoUrl: 'assets/icons/icons8-cutlery-96.png'
    //   },
    //   {
    //     id: 4,
    //     photoUrl: 'assets/icons/icons8-garage-96.png'
    //   },
    //   {
    //     id: 5,
    //     photoUrl: 'assets/icons/icons8-grapes-96.png'
    //   },
    //   {
    //     id: 6,
    //     photoUrl: 'assets/icons/icons8-office-chair-96.png'
    //   },
    //   {
    //     id: 7,
    //     photoUrl: 'assets/icons/icons8-office-phone-96.png'
    //   },
    //   {
    //     id: 8,
    //     photoUrl: 'assets/icons/icons8-soccer-ball-96.png'
    //   },
    //   {
    //     id: 9,
    //     photoUrl: 'assets/icons/icons8-swimming-96.png'
    //   },
    //   {
    //     id: 10,
    //     photoUrl: 'assets/icons/icons8-hamburger-96.png'
    //   },
    // ]

}
