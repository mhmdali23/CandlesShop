import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToCartRequest } from '../../models/addToCartRequest';
import { RemoveFromCartRequest } from '../../models/removeFromCartRequest';
import { ViewCartResponse } from '../../models/viewCartResponse';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  baseUrl  = "https://localhost:7012/api/cart/"
  
  constructor(private http:HttpClient) {
   }

  getSessionId():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}create-session`,{withCredentials: true});
  }

  addToCart(req:AddToCartRequest):Observable<string>{
     return this.http.post<string>(`${this.baseUrl}add`,req);
  }

  removeFromCart(req:RemoveFromCartRequest):Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}remove`,
      {body:req,withCredentials:true}
    )
  }

  updateCartItemQuantity(sessionId: string, productVariantId: number, quantity: number):Observable<any>{
    const body = {sessionId,productVariantId,quantity}
    return this.http.put<any>(`${this.baseUrl}update-quantity`,body,{withCredentials:true,    responseType: 'text' as 'json', 
    });
  }

  viewCart(sessionId:string):Observable<ViewCartResponse[]>{
    const headers = { SessionId: sessionId };
    return this.http.get<ViewCartResponse[]>(`${this.baseUrl}view`,{headers,withCredentials:true})
  }


}
