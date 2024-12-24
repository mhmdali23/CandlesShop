import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ViewCartResponse } from '../../models/viewCartResponse';
import { RemoveFromCartRequest } from '../../models/removeFromCartRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems:ViewCartResponse[]=[];
  sessionId :string= ''

  constructor(private cartService:CartService,private cookieService:CookieService,private router:Router){}


  ngOnInit(): void {
    this.sessionId = this.cookieService.get("SessionId")
    console.log(this.sessionId)
    if(this.sessionId){
      this.fetchCartItems();
    }else{
      console.log("a7aaaa")
    }
  }


  fetchCartItems():void{
    this.cartService.viewCart(this.sessionId).subscribe({
      next:(response) =>
        { 
          console.log(response)
          this.cartItems=response
        },error:()=>{
          console.log("error to fetch cartItems")
        }
    })
  }


  navigateToShop() {
    this.router.navigate(['/shop']);
  }
  navigateToOrder(){
    this.router.navigate(['/order'])
  }
  increaseQuantity(item:ViewCartResponse){
    item.quantity++;
    this.updateQuantity(item);
  }
  decreaseQuantity(item:ViewCartResponse){
    item.quantity--;
    this.updateQuantity(item);
  }

  updateQuantity(item:ViewCartResponse){
    if(item.quantity < 1){
      item.quantity = 1; 
    }

    this.cartService.updateCartItemQuantity(this.sessionId,item.productVariantId,item.quantity).subscribe({
      next:()=>{
        console.log(this.sessionId)
        console.log(item.productVariantId)
        console.log(item.quantity)
        this.calculateTotalPrice();
      }
    })
 
  }

  removeItem(productVariantId:number):void{
    const request:RemoveFromCartRequest = {sessionId: this.sessionId,productVariantId}

    this.cartService.removeFromCart(request).subscribe (()=>{
      this.cartItems = this.cartItems.filter((item) => item.productVariantId!=productVariantId)
    })
  }
  calculateItemTotal(item: any): number {
    return item.price * item.quantity;
  }
 
  calculateTotalPrice():number{
    return this.cartItems.reduce((total,item) => total + (item.price * item.quantity),0)
  }

  
}
