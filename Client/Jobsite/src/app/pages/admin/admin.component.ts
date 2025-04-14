import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router:Router){}

  navigateToAiChecker(){
    this.router.navigate(['/aiChecking']);
  }

  navigateToSecurityPolicy(){
    this.router.navigate(['/adminSecurity']);
  }
  navigateToAiMonitoring(){
    this.router.navigate(['/adminAiMonitoring'])
  }
}
