import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobSkillService } from '../../services/job-skill.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {
  jobs: any[] = [];
  skills: any[] = [];
  selectedJobId!: number;
  selectedSkillId!: number;
  job = {
    title: '',
    description: '',
    company: '',
    recruiterId: undefined as number | undefined // Ensure recruiterId is optional
  };
  loading = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private jobService: JobService,
    private jobSkillService: JobSkillService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
  
    // Fetch jobs and skills
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      this.loading = false;
    });
  
    this.jobSkillService.getAllSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
        this.errorMessage = 'Failed to fetch skills. Please try again later.';
        this.loading = false;
      }
    });
  
    // Log the current user to debug
    const currentUser = this.authService.getCurrentUser();
    //console.log('Current User:', currentUser); // Debug log
    
    if (currentUser && currentUser.role && currentUser.role.roleName === 'RECRUITER') {
      this.job.recruiterId = currentUser.id; // Set recruiterId
    } else {
      console.error('No recruiter logged in.');
      this.errorMessage = 'You need to be logged in as a recruiter to create jobs.';
    }
  }
  

  navigateToAnalytics() {
    this.router.navigate(['/analysis']);
  }

  navigateToCandidates() {
    this.router.navigate(['/candidates']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  navigateToInterview() {
    this.router.navigate(['/interview']);
  }

  onSubmit() {
    // Validate required fields
    if (!this.job.title || !this.job.description || !this.job.company) {
      alert('Please fill all required fields');
      return;
    }

    this.loading = true;
    
    // Ensure recruiterId is set before submission
    if (!this.job.recruiterId) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.role === 'RECRUITER') {
        this.job.recruiterId = currentUser.id; // Set recruiterId to current logged-in user
      } else {
        alert('You must be logged in as a recruiter to create a job.');
        this.loading = false;
        return;
      }
    }
  
    // Ensure recruiterId is defined before calling addJob
    if (this.job.recruiterId === undefined) {
      alert('Recruiter ID is missing. Please log in as a recruiter.');
      this.loading = false;
      return;
    }

    // Submit the job to the backend
    this.jobService.addJob(this.job as Job).subscribe({
      next: (res) => {
        //console.log('Job added!', res);
        alert('Job created successfully!');
        this.selectedJobId = res.id;
        this.loading = false;
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        console.error('Error adding job:', err);
        alert('Something went wrong. Please try again later.');
        this.loading = false;
      }
    });
  }

  addSkill() {
    // Ensure job and skill are selected before adding
    if (!this.selectedJobId || !this.selectedSkillId) {
      alert('Please select a job and a skill');
      return;
    }

    // Add selected skill to the selected job
    this.jobSkillService.addSkillToJob(this.selectedJobId, this.selectedSkillId).subscribe({
      next: (response) => {
        //console.log('Skill added to job:', response);
        alert('Skill added successfully!');
      },
      error: (error) => {
        console.error('Error adding skill to job:', error);
        alert('Failed to add skill. It might already be assigned.');
      },
    });
  }
}
