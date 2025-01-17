import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingDetails } from '../../models/shippingDetails';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl ="https://localhost:7012"

  constructor(private http:HttpClient) { }

  placeOrder(details:ShippingDetails):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });
    return this.http.post(`${this.baseUrl}/api/Order/confirm-order`,details, { headers,withCredentials:true })
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/dashboard/orders`);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/api/Order/update-order/${order.id}`, order);
  }

  verifyEmail(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Skip-Interceptor', 'true');
      
    return this.http.post(`${this.baseUrl}/api/Email/verify-token`, {}, { headers });
  }
  
  


  sendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Email/verify`, { email }, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
  
}
