import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SwiperModule } from 'swiper/angular'; // Import SwiperModule

@Component({
  selector: 'app-bestseller',
  standalone: true,
  imports: [CommonModule, RouterLink, SwiperModule], // Add SwiperModule
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.css']
})
export class BestsellerComponent {
  products: Product[] = [];
  breakpoints = {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  };

  pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getBestSellerProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(response);
      }
    });
  }

  calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }
}