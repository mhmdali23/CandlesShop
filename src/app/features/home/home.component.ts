import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackdropService } from '../../core/services/backdrop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 
  // isDialogOpen: boolean = false;
  // private subscription: Subscription = new Subscription();  constructor(public backdrop:BackdropService){}

  // ngOnInit(): void {

  //   this.subscription = this.backdrop.isDialogOpen$.subscribe(isOpen=>{
  //     this.isDialogOpen = isOpen;
  //   })
  // }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }


}
