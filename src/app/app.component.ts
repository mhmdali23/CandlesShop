import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { WhatsappPopupComponent } from './features/whatsapp-popup/whatsapp-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,RouterOutlet,NgxSpinnerModule,WhatsappPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Candles';
}
