import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Candles';
}
