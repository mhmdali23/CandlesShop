import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  @Input() selectedCategories: number[] = []; // Receive selected categories as input

  availableScents: string[] = [];
  availableCategories: Category[] = [];

  @Output() filtersChanged = new EventEmitter<{ scents: string[]; categories: number[] }>();

  selectedScents: string[] = [];

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadScents();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.availableCategories = categories),
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  loadScents(): void {
    this.productService.getScents().subscribe({
      next: (scents) => (this.availableScents = scents),
      error: (err) => console.error('Error loading scents:', err),
    });
  }

  onScentChange(scent: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedScents.push(scent);
    } else {
      this.selectedScents = this.selectedScents.filter((s) => s !== scent);
    }
    this.emitFilters();
  }

  onCategoryChange(categoryId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== categoryId);
    }
    this.emitFilters();
  }

  emitFilters(): void {
    this.filtersChanged.emit({
      scents: this.selectedScents,
      categories: this.selectedCategories,
    });
  }
}