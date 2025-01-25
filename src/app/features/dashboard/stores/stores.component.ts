import { Component } from '@angular/core';
import { Store } from '../../../models/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../../core/services/store.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StoreDto } from '../../../models/storeDto';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent {
  stores: Store[] = [];
  storeForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  currentStoreId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private toastr: ToastrService,
    private sanitizer:DomSanitizer
  ) {
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      imageFile: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores().subscribe(
      (data: Store[]) => {
        this.stores = data;
        console.log(this.stores);
      
      },
      (error) => {
        this.toastr.error('Failed to load stores', 'Error');
      }
    );
  }

  openAddStoreModal(): void {
    this.isEditMode = false;
    this.storeForm.reset();
    this.selectedFile = null;
  
    Swal.fire({
      title: 'Add New Store',
      html: `
        <form id="storeForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-900">Name:</label>
            <input id="name" formControlName="name" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-900">Address:</label>
            <input id="address" formControlName="address" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label for="imageFile" class="block text-sm font-medium text-gray-900">Image:</label>
            <input id="imageFile" type="file" (change)="onFileSelected($event)" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Store',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const name = (Swal.getPopup()!.querySelector('#name') as HTMLInputElement).value;
        const address = (Swal.getPopup()!.querySelector('#address') as HTMLInputElement).value;
        const imageFile = (Swal.getPopup()!.querySelector('#imageFile') as HTMLInputElement).files![0];
  
        if (!name || !address || !imageFile) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
  
        return { name, address, imageFile };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const storeDto: StoreDto = {
          name: result.value!.name,
          address: result.value!.address,
          imageFile: result.value!.imageFile,
        };
  
        this.storeService.addStore(storeDto).subscribe(
          () => {
            this.toastr.success('Store added successfully', 'Success');
            this.loadStores();
          },
          (error) => {
            this.toastr.error('Failed to add store', 'Error');
          }
        );
      }
    });
  }

  openEditStoreModal(store: Store): void {
    this.isEditMode = true;
    this.currentStoreId = store.id;
    this.storeForm.patchValue({
      name: store.name,
      address: store.address,
    });
  
    Swal.fire({
      title: 'Edit Store',
      html: `
        <form id="storeForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-900">Name:</label>
            <input id="name" value="${store.name}" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-900">Address:</label>
            <input id="address" value="${store.address}" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label for="imageFile" class="block text-sm font-medium text-gray-900">Image:</label>
            <input id="imageFile" type="file" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update Store',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const name = (Swal.getPopup()!.querySelector('#name') as HTMLInputElement).value;
        const address = (Swal.getPopup()!.querySelector('#address') as HTMLInputElement).value;
        const imageFile = (Swal.getPopup()!.querySelector('#imageFile') as HTMLInputElement).files![0];
  
        if (!name || !address) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
  
        return { name, address, imageFile };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const storeDto: StoreDto = {
          name: result.value!.name,
          address: result.value!.address,
          imageFile: result.value!.imageFile,
        };
  
        this.storeService.updateStore(this.currentStoreId!, storeDto).subscribe(
          () => {
            this.toastr.success('Store updated successfully', 'Success');
            this.loadStores();
          },
          (error) => {
            this.toastr.error('Failed to update store', 'Error');
          }
        );
      }
    });
  }
  getSafeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteStore(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this store!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storeService.deleteStore(id).subscribe(
          () => {
            this.toastr.success('Store deleted successfully', 'Success');
            this.loadStores();
          },
          (error) => {
            this.toastr.error('Failed to delete store', 'Error');
          }
        );
      }
    });
  }
}
