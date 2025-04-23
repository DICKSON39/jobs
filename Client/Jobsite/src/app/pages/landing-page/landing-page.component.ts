import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-landing-page',
  imports: [ HeroComponent,FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
