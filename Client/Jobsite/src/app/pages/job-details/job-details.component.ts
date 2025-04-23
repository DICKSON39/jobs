import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})


export class JobDetailsComponent implements OnInit {
  job:any;
  jobId:string | null = null
  message ='';


  constructor (private jobService:JobService,private route:ActivatedRoute,private authService:AuthService) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id'); // Get the job ID from the URL
   // console.log("Retrieved Job ID:", this.jobId);  // Log to check
    if(jobId) {
      this.jobId = jobId;
      this.jobService.getJobById(jobId).subscribe(
        (data) => {
          this.job = data
        },
        (error) => {
          console.error('Error fetching jobs by Id',error)
        }
      )
    }
  }

 apply() {
 // console.log("Job ID:", this.jobId);
  const userId = this.authService.getUserId()
  if (this.jobId) {
    console.log('Job ID:', this.jobId); 
    // Check the value of jobId
    console.log('User ID:', userId); // Check userId
    

    this.jobService.applyForJob(this.jobId,userId).subscribe({
      next: (res) => {
        console.log("Applied Successfully");
        this.message = res.message;
      },
      error: (err) => {
        this.message = err.error.message || 'Something went wrong';
      }
    });
  } else {
    console.log("No Job ID found to apply.");
  }
}



}
