import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  message: string = '';
  imageUrl: string = '';
  selectedImage: File | null = null;

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage(): void {
    this.messageService.getMessage().subscribe({
      next: (response) => {
        this.message = response.text;
        this.imageUrl = response.imageUrl;
      },
      error: () => {
        this.toastr.error('Failed to load message');
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  updateMessage(): void {
    const formData = new FormData();
    
    // Append the message text (even if it's empty)
    formData.append('text', this.message);

    // Append the image only if a new image is selected
    if (this.selectedImage) {
        formData.append('image', this.selectedImage);
    } else {
        // If no image is selected, append null to indicate removal of the existing image
        formData.append('image', '');
    }

    this.messageService.updateMessage(formData).subscribe({
        next: (response) => {
            this.toastr.success('Message updated successfully');
            this.message = response.text;
            this.imageUrl = response.imageUrl;
        },
        error: () => {
            this.toastr.error('Failed to update message');
        },
    });
}
}