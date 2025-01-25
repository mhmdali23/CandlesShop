import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { FiltersComponent } from '../filters/filters.component';
import { ProductService } from '../../core/services/product.service';
import { ProductParams } from '../../models/productParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent, FiltersComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = []; // Array to store fetched products
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  selectedScents: string[] = [];
  selectedCategories: number[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryIds = params['categoryId'] ? params['categoryId'].split(',').map(Number) : [];
      this.selectedCategories = categoryIds;
      this.loadProducts();
    });
  }

  loadProducts(): void {
    const params: ProductParams = {
      PageIndex: this.currentPage,
      PageSize: this.itemsPerPage,
      Scent: this.selectedScents,
      Categories: this.selectedCategories,
    };

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalItems = response.totalCount;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  onPageChanged(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onFiltersChanged(filters: { scents: string[]; categories: number[] }): void {
    this.selectedScents = filters.scents;
    this.selectedCategories = filters.categories;
    this.currentPage = 1; // Reset to the first page
    this.loadProducts();
  }

  calculateDiscount(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }
}