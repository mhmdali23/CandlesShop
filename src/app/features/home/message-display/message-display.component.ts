import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-display.component.html',
  styleUrl: './message-display.component.css'
})
export class MessageDisplayComponent {


  message: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage(): void {
    this.messageService.getMessage().subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: () => {
        this.message = '';
      }
    });
  }

  // items = new Array(11); // Number of balloons

  // getBalloonStyles(index: number) {
  //   // Randomize left position, animation duration, and delay for each balloon
  //   const left = `${Math.random() * 100}%`; // Random left position
  //   const animationDuration = `${Math.random() * 5 + 8}s`; // Random animation duration (between 8s and 13s)
  //   const animationDelay = `${Math.random() * 3}s`; // Random animation delay

  //   return {
  //     left: left,
  //     animationDuration: animationDuration,
  //     animationDelay: animationDelay
  //   };
  // }


}
