import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { AddToCartRequest } from '../../models/addToCartRequest';
import { RemoveFromCartRequest } from '../../models/removeFromCartRequest';
import { ViewCartResponse } from '../../models/viewCartResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = "https://localhost:7012/api/cart/";
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Get Session ID from the backend if needed
  getSessionId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}create-session`, { withCredentials: true });
  }

  // Add item to cart and update cart count
  addToCart(req: AddToCartRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}add`, req).pipe(
      tap(() => this.updateCartCount()),
    );
  }

  // Remove item from cart and update cart count
  removeFromCart(req: RemoveFromCartRequest): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}remove`, { body: req, withCredentials: true }).pipe(
      tap(() => this.updateCartCount()),
    );
  }

  // Update item quantity in cart and update cart count
  updateCartItemQuantity(sessionId: string, productVariantId: number, quantity: number): Observable<any> {
    const body = { sessionId, productVariantId, quantity };
    return this.http.put<any>(`${this.baseUrl}update-quantity`, body, {
      withCredentials: true,
      responseType: 'text' as 'json',
    }).pipe(
      tap(() => this.updateCartCount()),
    );
  }

  // Get cart items for the session
  viewCart(sessionId: string): Observable<ViewCartResponse[]> {
    const headers = { SessionId: sessionId };
    return this.http.get<ViewCartResponse[]>(`${this.baseUrl}view`, { headers, withCredentials: true }).pipe(
    );
  }

  // Update the cart item count based on the current cart items
  updateCartCount(): void {
    const sessionId = this.cookieService.get("SessionId");
    if (!sessionId) {
      console.error('SessionId not found!');
      return;
    }
    this.viewCart(sessionId).subscribe({
      next: (cartItems) => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        this.cartItemCountSubject.next(count);
      },
      error: (err) => {
        console.error('Error updating cart count', err);
        this.cartItemCountSubject.next(0);  // Reset count on error
      }
    });
  }

}
