import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  IsDashboardOpen: boolean = false;
  logoutConfirm: boolean = false;
  activeItem: string = 'dashboard';

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router, // Inject Router
    private activatedRoute: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set the active item based on the current route
    this.setActiveItemFromRoute();
  }

  OpenDashboard() {
    this.IsDashboardOpen = !this.IsDashboardOpen;
  }

  setActive(item: string) {
    this.activeItem = item;
    console.log(this.activeItem);
  }

  signout() {
    this.authService.logout();
    setTimeout(() => {
      window.location.href = "http://localhost:4200/home";
    }, 1000);
    this.toastr.success("Logout Successfully");
  }

  confirmLogout() {
    this.logoutConfirm = !this.logoutConfirm;
    console.log(this.logoutConfirm);
  }

  // Helper method to set the active item based on the current route
  private setActiveItemFromRoute() {
    const currentRoute = this.router.url; // Get the current route URL

    if (currentRoute.includes('/dashboard/candles')) {
      this.activeItem = 'Candles';
    } else if (currentRoute.includes('/dashboard/categories')) {
      this.activeItem = 'Categories';
    } else if (currentRoute.includes('/dashboard/scents')) {
      this.activeItem = 'Scents';
    } else if (currentRoute.includes('/dashboard/message')) {
      this.activeItem = 'Message';
    } else if (currentRoute.includes('/dashboard/stores')) {
      this.activeItem = 'Stores';
    } else {
      this.activeItem = 'dashboard'; // Default to dashboard
    }
  }
}