import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scent } from '../../models/scent';

@Injectable({
  providedIn: 'root'
})
export class ScentService {
  private baseUrl = 'https://localhost:7012/api/Scent';

  constructor(private http: HttpClient) { }

  getScents(): Observable<Scent[]> {
    return this.http.get<Scent[]>(this.baseUrl);
  }

  addScent(scent: Scent, image: File | null): Observable<Scent> {
    const formData = new FormData();
    formData.append('name', scent.name);
    formData.append('description', scent.description || '');
    if (image) {
      formData.append('image', image);
    }

    return this.http.post<Scent>(`${this.baseUrl}/add-scent`, formData);
  }

  updateScent(id: number, formData: FormData): Observable<Scent> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.put<Scent>(`${this.baseUrl}/update-scent/${id}`, formData, { headers });
  }

  deleteScent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}