import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../../models/store';
import { StoreDto } from '../../models/storeDto';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'https://localhost:7012/api/store'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all stores
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  // Fetch a single store by ID
  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  // Add a new store
  addStore(storeDto: StoreDto): Observable<Store> {
    const formData = new FormData();
    formData.append('Name', storeDto.name);
    formData.append('Address', storeDto.address);
    formData.append('ImageFile', storeDto.imageFile);

    return this.http.post<Store>(this.apiUrl, formData);
  }

  // Update an existing store
  updateStore(id: number, storeDto: StoreDto): Observable<Store> {
    const formData = new FormData();
    formData.append('Name', storeDto.name);
    formData.append('Address', storeDto.address);
    if (storeDto.imageFile) {
      formData.append('ImageFile', storeDto.imageFile);
    }

    return this.http.put<Store>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete a store
  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}