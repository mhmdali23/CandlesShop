import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingDetails } from '../../models/shippingDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl ="https://localhost:7012/api/Order/confirm-order"

  constructor(private http:HttpClient) { }

  placeOrder(details:ShippingDetails):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });
    return this.http.post(`${this.baseUrl}`,details, { headers,withCredentials:true })
  }
}
