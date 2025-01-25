import { Component, OnInit } from '@angular/core';
import { Scent } from '../../../models/scent';
import { ScentService } from '../../../core/services/scent.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scents.component.html',
  styleUrls: ['./scents.component.css']
})
export class ScentsComponent implements OnInit {
  scents: Scent[] = [];
  selectedScent: Scent | null = null;
  newScent: Scent = { id: 0, name: '', description: '' };
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  selectedImage: File | null = null;
  removeImage: boolean = false;

  constructor(
    private scentService: ScentService,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.loadScents();
  }

  loadScents(): void {
    this.scentService.getScents().subscribe({
      next: (data) => {
        this.scents = data;
      },
      error: (err) => {
        console.error('Failed to load scents:', err);
        this.toastr.error('Failed to load scents. Please try again.', 'Error'); // Toastr error message
      }
    });
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
    this.newScent = { id: 0, name: '', description: '' };
    this.selectedImage = null;
  }

  openUpdateModal(scent: Scent): void {
    this.selectedScent = { ...scent };
    this.isUpdateModalOpen = true;
    this.selectedImage = null;
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addScent(): void {
    this.scentService.addScent(this.newScent, this.selectedImage!).subscribe({
      next: (newScent) => {
        this.scents.push(newScent);
        this.isAddModalOpen = false;
        this.resetForm();
        this.toastr.success('Scent added successfully!'); // Toastr success message
      },
      error: (err) => {
        console.error('Failed to add scent:', err);
        this.toastr.error('Failed to add scent. Please try again.', 'Error'); // Toastr error message
      }
    });
  }

  updateScent(): void {
    if (this.selectedScent?.id) {
      const formData = new FormData();
      formData.append('id', this.selectedScent.id.toString());
      formData.append('name', this.selectedScent.name);
      formData.append('description', this.selectedScent.description || '');

      if (this.removeImage) {
        formData.append('imageUrl', 'null');
      } else if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.scentService.updateScent(this.selectedScent.id, formData).subscribe({
        next: (updatedScent) => {
          const index = this.scents.findIndex(s => s.id === updatedScent.id);
          if (index !== -1) {
            this.scents[index] = updatedScent;
          }
          this.isUpdateModalOpen = false;
          this.resetForm();
          this.toastr.success('Scent updated successfully!'); // Toastr success message
        },
        error: (err) => {
          console.error('Failed to update scent:', err);
          this.toastr.error('Failed to update scent. Please try again.', 'Error'); // Toastr error message
        }
      });
    }
  }

  deleteScent(id: number, event: Event): void {
    event.stopPropagation();

    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion
        this.scentService.deleteScent(id).subscribe({
          next: (result) => {
            if (result) {
              this.loadScents(); // Reload the scents list
              Swal.fire('Deleted!', 'Your scent has been deleted.', 'success'); // SweetAlert2 success message
            }
          },
          error: (err) => {
            console.error('Failed to delete scent:', err);
            Swal.fire('Error!', 'Failed to delete scent. Please try again.', 'error'); // SweetAlert2 error message
          }
        });
      }
    });
  }

  resetForm(): void {
    this.selectedScent = null;
    this.newScent = { id: 0, name: '', description: '' };
    this.selectedImage = null;
  }
}