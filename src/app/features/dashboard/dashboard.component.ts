import { Component, input, signal } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  
  IsDashboardOpen:boolean = false;

  OpenDashboard(){
    this.IsDashboardOpen = !this.IsDashboardOpen;
  }

}
