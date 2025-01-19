import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [];
  newCategory = {
    name: '',
    description: '',
    image: null as File | null
  };
  editingCategory = {
    id: null as number | null,
    name: '',
    description: '',
    image: null as File | null,
    imageUrl: ''
  };
  isEditing = false;
  isListCollapsed = false;
  showDeleteAlertBox = false;
  categoryIdToDelete: number | null = null;

  constructor(private categoryService: CategoriesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newCategory.image = file;
    }
  }

  onUpdateFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editingCategory.image = file;
    }
  }

  addCategory(): void {
    if (!this.newCategory.name) {
      this.toastr.warning('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newCategory.name);
    formData.append('description', this.newCategory.description);
    if (this.newCategory.image) {
      formData.append('image', this.newCategory.image);
    }

    this.categoryService.addCategory(formData).subscribe(
      () => {
        this.toastr.success('Category added successfully!');
        this.resetForm();
        this.getCategories();
      },
      (error) => {
        this.toastr.error('Failed to add category. Please try again.');
        console.error('Error adding category:', error);
      }
    );
  }

  updateCategory(): void {
    if (!this.editingCategory.id || !this.editingCategory.name) {
      this.toastr.warning('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.editingCategory.name);
    formData.append('description', this.editingCategory.description);
    if (this.editingCategory.image) {
      formData.append('image', this.editingCategory.image);
    }
    console.log('formData:', formData);
    this.categoryService.updateCategory(this.editingCategory.id, formData).subscribe(
      () => {
        this.toastr.success('Category updated successfully!');
        this.resetForm();
        this.getCategories();
      },
      (error) => {
        this.toastr.error('Failed to update category. Please try again.');
        console.error('Error updating category:', error);
      }
    );
  }

  showDeleteAlert(id: number): void {
    this.showDeleteAlertBox = true;
    this.categoryIdToDelete = id;
  }

  cancelDelete(): void {
    this.showDeleteAlertBox = false;
    this.categoryIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.categoryIdToDelete) {
      this.categoryService.deleteCategory(this.categoryIdToDelete).subscribe(
        () => {
          this.toastr.success('Category deleted successfully!');
          this.getCategories();
        },
        (error) => {
          this.toastr.error('Failed to delete category. Please try again.');
          console.error('Error deleting category:', error);
        }
      );
    }
    this.showDeleteAlertBox = false;
    this.categoryIdToDelete = null;
  }

  editCategory(category: Category): void {
    this.isEditing = true;
    this.editingCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      image: null,
      imageUrl: category.imageUrl
    };
  }

  resetForm(): void {
    this.isEditing = false;
    this.newCategory = {
      name: '',
      description: '',
      image: null
    };
    this.editingCategory = {
      id: null,
      name: '',
      description: '',
      image: null,
      imageUrl: ''
    };
  }

  toggleList(): void {
    this.isListCollapsed = !this.isListCollapsed;
  }

  closeUpdateForm(): void {
    this.isEditing = false;
    this.resetForm();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
}