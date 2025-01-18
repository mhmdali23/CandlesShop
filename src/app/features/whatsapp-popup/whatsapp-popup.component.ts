import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-popup.component.html',
  styleUrl: './whatsapp-popup.component.css'
})
export class WhatsappPopupComponent {

  showPopup: boolean = false;
  ngOnInit(): void {
    
    setTimeout(() => {
      this.showPopup = true;
    }, 3500);
  }

  closePopup() {
    this.showPopup = false;
  }
}
