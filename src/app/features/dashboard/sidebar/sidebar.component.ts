import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {  RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(private authService:AuthenticationService,private toastr:ToastrService){}
  IsDashboardOpen :boolean = false;

  logoutConfirm:boolean = false
  activeItem :string='';

  OpenDashboard(){
    this.IsDashboardOpen = !this.IsDashboardOpen;
  }

  setActive(item:string){
    this.activeItem = item;
    console.log(this.activeItem)
  }

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
