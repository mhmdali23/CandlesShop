import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriesComponent } from "./categories/categories.component";
import { ProductsComponent } from "./products/products.component";
import { TodayoffersComponent } from "./todayoffers/todayoffers.component";
import { BestsellerComponent } from "./bestseller/bestseller.component";
import { MessageDisplayComponent } from "./message-display/message-display.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, ProductsComponent, TodayoffersComponent, BestsellerComponent, MessageDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
