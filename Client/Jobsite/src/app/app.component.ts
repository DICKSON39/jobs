import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/landing-page/navbar/navbar.component';
import { FooterComponent } from './pages/landing-page/footer/footer.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

  
  constructor(private router:Router){}

}
