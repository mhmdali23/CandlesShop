import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl="https://localhost:7012/api/"
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}Category`).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Failed to fetch categories. Please try again later.'));
      })
    );
  }
}
