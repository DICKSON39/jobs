import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
})
export class InterviewComponent implements OnInit {
  applications: any[] = [];
  interViewData: { [key: number]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.http.get<any>('http://54.197.174.28:3000/api/v1/applications').subscribe({
      next: (res) => {
        if (Array.isArray(res.applications)) {
          this.applications = res.applications;
        } else {
          console.error('Expected applications array, but got:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
      }
    });
  }
  

  scheduleInterview(applicationId: number) {
    const scheduledDate = this.interViewData[applicationId];

    if (!scheduledDate) {
      alert('Please select a date first!');
      return;
    }

    const interview = {
      applicationId,
      scheduledDate,
      status: 'scheduled',
      notes: 'Initial interview',
    };

    this.http.post('http://54.197.174.28:3000/api/v1/interviews', interview).subscribe({
      next: (res) => {
        alert('Interview scheduled!');
      },
      error: (err) => {
        console.error('Error scheduling interview:', err);
        alert('Failed to schedule interview');
      },
    });
  }
}
