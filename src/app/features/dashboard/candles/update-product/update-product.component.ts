import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  
  @Input() categories:any =[]
  @Input() scents:any=[]
  @Input() selectedProduct:any;

  @Output() productUpdated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();


  updateProduct(){
    if(this.selectedProduct){
      this.productUpdated.emit(this.selectedProduct)

    }
  }

  closeModal(){
    this.modalClosed.emit();
  }
}