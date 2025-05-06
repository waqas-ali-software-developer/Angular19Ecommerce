import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight: any;
  screenWidth: any;
  footerMaxHeight: any;
  title = 'angular19ecommerece';

  constructor() {
    this.getScreenSize(event);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this.footerMaxHeight = this.screenHeight - 160;
    //console.log(this.screenHeight, this.screenWidth);
  }

}
