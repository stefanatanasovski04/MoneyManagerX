import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/shared/models/categories';
import { CategoryType } from 'src/app/shared/models/enums';
import { EnvelopeGeneric } from 'src/app/shared/models/envelope-generic';
import { IListResultDto } from 'src/app/shared/models/list-result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/api'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getCategoriesList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories?type=${CategoryType.Expense}`);
  }
}
