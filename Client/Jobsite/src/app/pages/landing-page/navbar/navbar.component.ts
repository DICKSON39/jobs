import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;
  private http = inject(HttpClient);
  

  constructor(private router: Router,private authService:AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToHome() {
    this.isMenuOpen = false; // Close menu after navigation
    this.router.navigate(['']); // Adjust route as needed
  }

  navigateToAdmin() {
    this.isMenuOpen = false;
    this.router.navigate(['/admin']); // Adjust route as needed
  }

  navigateToEmployer() {
    this.isMenuOpen = false;
    this.router.navigate(['/employee']); // Adjust route as needed
  }

  navigateToJobseeker() {
    this.isMenuOpen = false;
    this.router.navigate(['/jobseeker']); // Adjust route as needed
  }

  navigateToLogin() {
    this.isMenuOpen = false;
    this.router.navigate(['/login']); // Adjust route as needed
  }

  navigateToRegister() {
    this.isMenuOpen = false;
    this.router.navigate(['/register']); // Adjust route as needed
  }


  

  logoutUser() {
    this.authService.logoutUser();
  }
  

  
}
