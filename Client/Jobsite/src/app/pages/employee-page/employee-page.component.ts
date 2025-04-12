import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  imports: [],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent {
  constructor(private router: Router){}

  navigateToAnalytics() {
    this.router.navigate(['/analysis']);

  }

  navigateToCandidates() {
    this.router.navigate(['/candidates']);
  }

  navigateToChat(){
    this.router.navigate(['/chat']);
  }
  navigateToInterview(){
    this.router.navigate(['/interview']); 
  }
  

}
