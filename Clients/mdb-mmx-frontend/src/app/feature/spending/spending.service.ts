import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { IEnvelope } from 'src/app/shared/models/dtos';
import { ITotalByCategoryResponse } from 'src/app/shared/models/responses';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
}
