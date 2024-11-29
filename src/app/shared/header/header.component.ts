import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  isMenuOpen: boolean = false;

  // Toggles the menu for small screens
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}