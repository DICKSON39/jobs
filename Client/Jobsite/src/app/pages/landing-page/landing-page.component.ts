import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';


@Component({
  selector: 'app-landing-page',
  imports: [ HeroComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
