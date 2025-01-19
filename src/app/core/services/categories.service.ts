import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../../models/category';
import { AddCategory } from '../../models/addCategory';
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

  addCategory(formData:FormData):Observable<void>{
    return this.http.post<void>(`${this.baseUrl}Category/add-category`,formData);
  }
  updateCategory(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}Category/update-category/${id}`, formData);
  }
  
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Category/remove-category/${id}`);
  }
}
