import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<FormData>();

  @Input() categories:any =[]
  @Input() scents:any=[]


  newProduct: any = {
    name: '',
    scent: '',
    benefits: '',
    callToAction: '',
    isBestSeller: false,
    isDailyOffer: false,
    discountPercentage: null,
    description: '',
    features: '',
    image: null,
    categoryId: 0 // Set to a default valid category ID
  };

  imageErrorMessage: string = '';
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file && !allowedTypes.includes(file.type)) {
      this.imageErrorMessage = 'Invalid file type. Only JPEG, PNG, JPG allowed.';
    } else if (file && file.size > 5 * 1024 * 1024) {
      this.imageErrorMessage = 'File size exceeds 5MB.';
    } else {
      this.imageErrorMessage = '';
      this.newProduct.image = file;
    }
  }

  addProduct(): void {
    if (!this.newProduct.image) {
      return;
    }
  
    const formData = new FormData();
    formData.append('Name', this.newProduct.name);
    formData.append('Scent', this.newProduct.scent);
    formData.append('Benefits', this.newProduct.benefits || '');
    formData.append('Description', this.newProduct.description || '');
    formData.append('Features', this.newProduct.features || '');
    formData.append('CallToAction', this.newProduct.callToAction || '');
    formData.append('DiscountPercentage', this.newProduct.discountPercentage?.toString() || '0');
    formData.append('IsBestSeller', this.newProduct.isBestSeller.toString());
    formData.append('IsDailyOffer', this.newProduct.isDailyOffer.toString());
    formData.append('CategoryId', this.newProduct.categoryId?.toString());
    formData.append('Image', this.newProduct.image);
  
    this.productAdded.emit(formData);
    this.resetForm();
  }
  

  closeAddProductModal() {
    this.closeModal.emit();
  }

  resetForm() {
    this.newProduct = {
      name: '',
      scent: '',
      benefits: '',
      callToAction: '',
      isBestSeller: false,
      isDailyOffer: false,
      discountPercentage: null,
      description: '',
      features: '',
      image: null,
      categoryId: 0,
    };
  }
  


}
