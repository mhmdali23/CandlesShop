import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductDetails } from '../../models/productDetails';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductVariant } from '../../models/productVariant';
import { CartService } from '../../core/services/cart.service';
import { AddToCartRequest } from '../../models/addToCartRequest';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails: ProductDetails | null = null;
  selectedWeight: number = 0;
  selectedVariant: ProductVariant | null = null; 

  addToCartReq:AddToCartRequest = {
    sessionId:'',
    productVariantId:0,
    quantity:0
  }
  quantity:number=1;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService:CartService,private toastr:ToastrService,private cookieService:CookieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.getProductDetails(id);
      }
    });
    this.initSession()
  }

  getCookie(name:string):string|null{

    return this.cookieService.get(name)
    
  }

  private initSession(){
    const sessionId= this.getCookie("SessionId");
    console.log(sessionId)
    if(!sessionId){
      this.cartService.getSessionId().subscribe({
        next: (response) => {
          this.addToCartReq.sessionId = response.sessionId;
          console.log(response.sessionId)
        },
        error: (err) => {
          console.error('Error initializing session:', err);
          this.toastr.error('Failed to create a session. Please try again.');
        },
        });
      }else{
        console.log(sessionId)
         this.addToCartReq.sessionId = sessionId
      } 
      console.log(document.cookie)
    }


  addToCart(addToCartReq:AddToCartRequest){
    if(!addToCartReq.sessionId){
      this.toastr.error('Please refresh the page.');
      return;
    }

    if(this.selectedVariant){
      addToCartReq.productVariantId = this.selectedVariant.id;
      addToCartReq.quantity = this.quantity;

      this.cartService.addToCart(addToCartReq).subscribe({
        next: () => {
          this.toastr.success('Added to cart successfully!');
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          this.toastr.error('Failed to add to cart. Please try again.');
        },
      });
    }
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.productDetails = response;
        // Set the default selected variant based on the first product variant (if available)
        if (this.productDetails?.productVariants?.length > 0) {
          this.selectedVariant = this.productDetails.productVariants[0];
          this.selectedWeight = this.selectedVariant.weight;
        }
        console.log(response)
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      }
    });
  }

  onWeightChange(): void {
    // Find the selected variant based on the selected weight
    this.selectedVariant = this.productDetails?.productVariants.find(
      (variant) => variant.weight === this.selectedWeight
    ) || null;  // Ensure selectedVariant is either ProductVariant or null

    if (this.selectedVariant?.stockQuantity === 0) {
      this.toastr.warning('This variant is sold out.');
    }
  }
  

  increadeQuantity(){
    this.quantity++;
  }

  decreaseQuantity(){
    if(this.quantity >1){
      this.quantity--;
    }
  }


  // Get price after discount
  getPriceAfterDiscount(): number {
    return this.selectedVariant?.priceAfterDiscount || this.selectedVariant?.price || 0;
  }
}
