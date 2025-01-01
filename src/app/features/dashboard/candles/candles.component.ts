import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { ProductParams } from '../../../models/productParams';
import { PaginationComponent } from '../../pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../models/category';
import { ToastrService } from 'ngx-toastr';
import { AddProductComponent } from "./add-product/add-product.component";
import { UpdateProductComponent } from "./update-product/update-product.component";

@Component({
  selector: 'app-candles',
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule, AddProductComponent, UpdateProductComponent],
  templateUrl: './candles.component.html',
  styleUrl: './candles.component.css'
})
export class CandlesComponent implements OnInit {

  products:Product[]=[]

  scents:string[]=[]

  itemsPerPage =6
  totalItems=0
  currentPage = 1

  categories:Category[]=[]


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

  isAddProductModalOpen = false;
  imageErrorMessage: string = '';

  constructor(private productService:ProductService,private categoryService:CategoriesService,private toastr:ToastrService){}

  isModelOpen = false
  selectedProduct :Product|null = null

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadScents();
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response)=>{
        this.categories=response
        console.log(response)
      }
    })
  }


  loadScents(){
    this.productService.getScents().subscribe({
      next:(response)=>{
        this.scents=response
        console.log(response)
      }
    })
  }
  loadProducts(){

    const params :ProductParams={
      PageIndex: this.currentPage,
      PageSize:this.itemsPerPage,
      Scent:[],
      Categories:[]
    };

    this.productService.getProducts(params).subscribe({
      next:(response)=>{
        this.products = response.data
        this.totalItems=response.totalCount
      }
    })
  }

  onPageChanged(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
 
      this.loadProducts(); // Load products for the selected page
    }
  }

  openUpdateModal(product: Product): void {
    this.selectedProduct={...product};
    this.isModelOpen=true

  }

  closeModel():void{
    this.isModelOpen=false
    this.selectedProduct=null
  }

  updateProduct(selectedProduct:any): void {
    if (selectedProduct) {
        const formData = new FormData();

        // Append basic product details
        formData.append('Name', selectedProduct.name);
        formData.append('Scent', selectedProduct.scent);
        formData.append('Benefits', selectedProduct.benefits || '');
        formData.append('Description', selectedProduct.description || '');
        formData.append('Features', selectedProduct.features || '');
        formData.append('CallToAction', selectedProduct.calltoaction || '');
        formData.append('DiscountPercentage', selectedProduct.discountpercentage?.toString() || '0');
        formData.append('IsBestSeller', selectedProduct.isBestSeller.toString());
        formData.append('IsDailyOffer', selectedProduct.isDailyOffer.toString());
        formData.append('CategoryId', selectedProduct.categoryId?.toString());

        // Validate and append image if it exists
        const fileInput = document.querySelector('#image') as HTMLInputElement;
        const errorMessageElement = document.querySelector('#imageErrorMessage') as HTMLElement;
        if (fileInput?.files?.length) {
            const file = fileInput.files[0];

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.toastr.error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                errorMessageElement.textContent = 'Invalid file type. Please upload a JPEG, PNG,jpg';
                return;
            }

            // Validate file size (max 5MB)
            const maxSizeInMB = 5;
            if (file.size > maxSizeInMB * 1024 * 1024) {
                this.toastr.error('Image size exceeds 5MB. Please upload a smaller image.');
                errorMessageElement.textContent = 'Image size exceeds 5MB. Please upload a smaller image.';
                return;
            }

            // Clear previous error message
            errorMessageElement.textContent = '';

            // Append valid image
            formData.append('Image', file);
            this.submitProductUpdate(formData);
        } else {
            // Proceed without an image
            this.submitProductUpdate(formData);
        }
    }
  }

  private submitProductUpdate(formData: FormData): void {
      this.productService.updateProduct(formData, this.selectedProduct!.id).subscribe({
          next: () => {
              this.closeModel();
              this.loadProducts();
              this.toastr.success('Product updated successfully');
          },
          error: (err) => {
              console.error('Error updating product:', err);
              this.toastr.error('Error updating product');
          }
      });
  }



  openAddProductModal(): void {
    this.isAddProductModalOpen = true;
  }

  closeAddProductModal(): void {
    this.isAddProductModalOpen = false;
  }

 

  addProduct(newProduct:FormData): void {
    
    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        this.closeAddProductModal();
        this.loadProducts();
        this.toastr.success('Product added successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to add product');
        console.error('Error:', err);
      }
    });
  }


  

}