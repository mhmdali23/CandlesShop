import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule,RouterLink], 
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to the cart item count observable
    this.cartService.cartItemCount$.subscribe({
      next: (count) => {
        this.cartItemCount = count;
      },
      error: (err) => {
        console.error('Error fetching cart count', err);
      }
    });

    // Initialize cart count on component load
    this.cartService.updateCartCount();
  }


}
