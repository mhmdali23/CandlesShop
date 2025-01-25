import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../core/services/store.service';
import { CommonModule } from '@angular/common';
import { Store } from '../../../models/store';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-store-display',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SwiperModule],
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.css'],
})
export class StoreDisplayComponent {
  stores: Store[] = [];

  constructor(private storeService: StoreService) {}

  // Swiper breakpoints
  breakpoints = {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  };

  // Swiper pagination configuration
  pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores().subscribe(
      (data: Store[]) => {
        this.stores = data;
      },
      (error) => {
        console.error('Error loading stores', error);
      }
    );
  }
}