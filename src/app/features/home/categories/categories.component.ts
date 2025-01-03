import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../models/category';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  constructor(private categoryService:CategoriesService){}
  items:Category[]=[];
  currentIndex= 0;
  showItemsPerSlide: number = 1;
  ngOnInit(): void {
  
    this.categoryService.getCategories().subscribe({
      next:(categories)=>{
        this.items=categories;
        console.log(this.items);
        this.updateItemsPerSlide();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    })
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



  prevSlide() {
    if (this.currentIndex === 0) {
      // Jump to the last slide
      this.currentIndex = this.items.length - this.showItemsPerSlide;
    } else {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
  }

  nextSlide() {
    if (this.currentIndex >= this.items.length - this.showItemsPerSlide) {
      // Jump back to the first slide
      this.currentIndex = 0;
    } else {
      this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - this.showItemsPerSlide);
    }
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * (100 / this.showItemsPerSlide)}%)`;
  }
}
