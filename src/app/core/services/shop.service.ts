import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  baseUrl = "https://localhost:7012/api/"
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return  this.http.get<Product[]>(`${this.baseUrl}Product`);
  }
  
}
