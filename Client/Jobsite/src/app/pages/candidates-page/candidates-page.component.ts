import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidates-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './candidates-page.component.html',
  styleUrl: './candidates-page.component.css'
})
export class CandidatesPageComponent implements OnInit {
  userSkills:any[] =[];
  searchTerm:string ='';
  selectedUser:any =null;
  constructor(private http:HttpClient) {}

  filteredSkills(): any[] {
    const term = this.searchTerm.toLowerCase();
    return this.userSkills.filter(
      skill =>
        skill.userName?.toLowerCase().includes(term) ||
        skill.skillName?.toLowerCase().includes(term)
    );
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://3.83.129.250:3000/api/v1/user-skills/users/user-skills')
    .subscribe(
      (data) => {
        this.userSkills = data;
        //console.log('User Skills:', this.userSkills); // Verify the data is received
      },
      (error) => {
        console.error('Error fetching user skills:', error);
      }
    );
  }

  // Method to fetch user details on "View Profile" button click
  viewUserProfile(userId: number): void {
    this.http.get<any>(`http://3.83.129.250:3000/api/v1/users/users/${userId}`).subscribe(
      (data) => {
        this.selectedUser = data;  // Save the user details in selectedUser
        console.log('User Profile:', this.selectedUser);  // Log or display the profile
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
