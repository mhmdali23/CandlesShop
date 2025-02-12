import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CartIconComponent } from '../../features/cart-icon/cart-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink,CartIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(private authService:AuthenticationService,private toastr:ToastrService){}
  isNavHidden = false;
  private lastScrollTop = 0;


  isAuth:boolean=false;
  ngOnInit(): void {
    this.isAuth=this.authService.isAuthenticated()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // Scrolling down
      this.isNavHidden = true;
    } else {
      // Scrolling up
      this.isNavHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }
  isMenuOpen: boolean = false;

  // Toggles the menu for small screens
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isAdminOpen = false;


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

  closeToggle(){
    this.isMenuOpen =false
  }
  
  logoutConfirm:boolean = false


  signout(){
    this.authService.logout();
    setTimeout(() => {
      window.location.href="http://localhost:4200/home"
    }, 1000);
    this.toastr.success("Logout Successfully")

  }

  confirmLogout(){
    this.logoutConfirm = !this.logoutConfirm ;
    console.log(this.logoutConfirm)
  }
}