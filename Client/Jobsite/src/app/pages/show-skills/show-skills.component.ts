import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-show-skills',
  imports: [CommonModule,FormsModule],
  templateUrl: './show-skills.component.html',
  styleUrl: './show-skills.component.css'
})
export class ShowSkillsComponent {
  constructor(private http:HttpClient,private authService:AuthService) {}

  userId: string = ''; // Initialize userId
  userSkills: any[]= []; // Define userSkills

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Get the userId from your AuthService
  
    //console.log('User ID:', this.userId); // Debugging step to ensure userId is correct
  
    const url = `http://54.197.174.28:3000/api/user-skills/${this.userId}`;
    this.http.get(url).subscribe({
      next: (userSkills: any) => {
        this.userSkills = userSkills; // Populate the userSkills array
        //console.log('User Skills:', this.userSkills);  // Verify the structure of userSkills
      },
      error: (err) => {
        console.error('Error fetching user skills:', err);  // Handle error
      }
    });
  }
  
  
}
