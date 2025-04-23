import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-jobseeker',
  imports: [FormsModule,CommonModule],
  templateUrl: './jobseeker.component.html',
  styleUrl: './jobseeker.component.css'
})
export class JobseekerComponent implements OnInit {
 constructor (private router:Router,private http:HttpClient,private authService:AuthService) {}

 

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

  navigateToshowSkills(){
    this.router.navigate([`/user/user-skills/${this.userId}`])
  }

  
  userId: number = 0; // Initialize userId
  userSkills: any[]=[]; // Define userSkills

  ngOnInit(): void {
    // Fetch the userId from AuthService
    this.userId = Number(this.authService.getUserId());
   // console.log('User ID:', this.userId);  // Debugging step to ensure userId is correct
  
    // Construct the correct URL
    const url = `http://54.197.174.28:3000/api/user-skills/${this.userId}`;
  
    // Make the HTTP GET request
    this.http.get(url).subscribe({
      next: (userSkills: any) => {
        this.userSkills = userSkills;
        //console.log('User Skills:', this.userSkills); // Log the response to verify the data
  
        // Ensure that the response contains skillname
        this.userSkills.forEach(skill => {
          //console.log('Skill Name:', skill.skillname);  // Debugging step
        });
      },
      error: (err) => {
        console.error('Error fetching user skills:', err);
      }
    });
  }
}
