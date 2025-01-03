import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  homeProducts:Product[]=[]
  constructor(private productService:ProductService){}

  ngOnInit(): void {
   
    this.productService.getHomeProducts().subscribe({
      next:(response) => this.homeProducts = response
    })
    
  }

  calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

 

}
