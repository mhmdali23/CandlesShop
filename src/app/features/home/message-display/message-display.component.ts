import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent {
  message: string = '';
  imageUrl: string = '';

  constructor(private messageService: MessageService) {}

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
        this.message = '';
        this.imageUrl = '';
      }
    });
  }
}