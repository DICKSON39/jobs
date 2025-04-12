import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-jobseeker',
  imports: [],
  templateUrl: './jobseeker.component.html',
  styleUrl: './jobseeker.component.css'
})
export class JobseekerComponent {
 constructor (private router:Router) {}

 navigateToJobsAvailable() {
    this.router.navigate(['/jobseeker/jobs']);
  }

  navigateToCvUpload() {
    this.router.navigate(['/cvUpload']);
  }

  navigateToSkills(){
    this.router.navigate(['/jobseeker/skills']);
  }
  navigateToNotifications(){
    this.router.navigate(['/notifications']);
  }
  navigateToCareerPath(){
    this.router.navigate(['/careerPath']);
  }

}
