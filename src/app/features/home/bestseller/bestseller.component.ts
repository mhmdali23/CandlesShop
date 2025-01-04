import { Component, HostListener } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bestseller',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './bestseller.component.html',
  styleUrl: './bestseller.component.css'
})
export class BestsellerComponent {

  products:Product[]=[]
  currentIndex= 0;
  showItemsPerSlide: number = 1;
  constructor(private productService:ProductService){}

ngOnInit(): void {
  this.updateItemsPerSlide(); 
  this.loadProducts();
  
}

 @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerSlide();
  }

  updateItemsPerSlide(){
    const width=window.innerWidth;
    if(width <600){
      this.showItemsPerSlide = 1;
    }else if(width <900){
      this.showItemsPerSlide = 2
    }else if(width<1200){
      this.showItemsPerSlide=3;
    }else{
      this.showItemsPerSlide=4
    }
  }

  loadProducts(){
    this.productService.getBestSellerProducts().subscribe({
      next:(response)=>{
        this.products=response
        console.log(response)
      }
    })
  }

  calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

  prevSlide() {
    if (this.currentIndex === 0) {
      // Jump to the last slide
      this.currentIndex = this.products.length - this.showItemsPerSlide;
    } else {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
  }

  nextSlide() {
    if (this.currentIndex >= this.products.length - this.showItemsPerSlide) {
      // Jump back to the first slide
      this.currentIndex = 0;
    } else {
      this.currentIndex = Math.min(this.currentIndex + 1, this.products.length - this.showItemsPerSlide);
    }
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * (100 / this.showItemsPerSlide)}%)`;
  }
}
