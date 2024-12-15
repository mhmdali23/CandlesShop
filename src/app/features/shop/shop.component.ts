import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { FiltersComponent } from '../filters/filters.component';
import { ProductService } from '../../core/services/product.service';
import { ProductParams } from '../../models/productParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,RouterLink,PaginationComponent,FiltersComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = []; // Array to store fetched products
  totalItems:number=0;
  currentPage:number=1;
  itemsPerPage:number=6;
  selectedScents:string[]=[];
  selectedCategories:number[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(): void {
    const params :ProductParams={
      PageIndex: this.currentPage,
      PageSize:this.itemsPerPage,
      Scent:this.selectedScents,
      Categories:this.selectedCategories
    };

    console.log(this.currentPage);
    this.productService.getProducts(params).subscribe({
      next: (response) =>{
        this.products=response.data
        this.totalItems = response.totalCount
        console.log(response)
      }
      
    })
  }

  onPageChanged(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
  
      const filters = { scents: this.selectedScents, categories: this.selectedCategories };
      this.loadProducts(); // Load products for the selected page
    }
  }


  onFiltersChanged(filters: { scents: string[]; categories: number[] }): void {
    // Update selected filters
    this.selectedScents = filters.scents;
    this.selectedCategories = filters.categories;

    // Reset to the first page when filters change
    this.currentPage = 1;

    // Reload products with updated filters and pagination
    this.loadProducts();
  }

  calculateDiscount(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }
  
}
