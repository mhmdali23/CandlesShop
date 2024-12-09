import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(private authService:AuthenticationService){}

  isAuth:boolean=false;
  ngOnInit(): void {
    this.isAuth=this.authService.isAuthenticated()
  }

  isMenuOpen: boolean = false;

  // Toggles the menu for small screens
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isSidebarOpen = false;
  isAdminOpen = false;
  toggleCart() {
    const body =document.body;
    if(this.isSidebarOpen){
      body.style.position = "";
      body.style.top = "";
      body.style.height = "";
      body.style.overflowY = "";

    }
    else{
      body.style.height = "100vh";
      body.style.overflowY = "hidden";
    }
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleAdmin(){
    const body =document.body;
    if(this.isAdminOpen){
      body.style.position = "";
      body.style.top = "";
      body.style.height = "";
      body.style.overflowY = "";

    }
    else{
      body.style.height = "100vh";
      body.style.overflowY = "hidden";
    }
    this.isAdminOpen = !this.isAdminOpen;
  }

  onSubmit(){
    
  }
}