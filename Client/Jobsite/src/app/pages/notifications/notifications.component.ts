import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InterviewService } from '../../services/interview.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [FormsModule,CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  interviews: any[] = [];
  applicationId!: number;
  notificationMessage: string = '';
  unreadCount: number = 0;

  
  constructor(private interViewService:InterviewService,
    private route:ActivatedRoute
  ) {}

 ngOnInit(): void {
     this.applicationId = parseInt(this.route.snapshot.paramMap.get('applicationId') || '0')
     console.log('Application ID:', this.applicationId);

     if (this.applicationId) {
      this.interViewService
      .getInterviewsByApplication(this.applicationId)
      .subscribe({
        next: (data) => {
          console.log('Fetched Interviews:', data);
          this.interviews = data
          this.checkForScheduledInterviews();
        },
        error: (err) => {
          console.error('Failed To fetch Interviews',err)
        }
      })
     }
 }

 

  // Check for a scheduled interview and set the message accordingly
  checkForScheduledInterviews() {
    const scheduledInterview = this.interviews.find(interview => interview.status?.toLowerCase() === 'scheduled');
    
    if (scheduledInterview) {
      // If interview is scheduled, show a notification message
      this.notificationMessage = 'Your interview has been scheduled for next week. Please check your email for details.';
      this.unreadCount=1
    } else {
      // If no interview is scheduled, show a default message or nothing
      this.notificationMessage = '';
      this.unreadCount = 0;
    }
  }

  markAsRead() {
    this.notificationMessage = '';  // Clear notification message
    this.unreadCount = 0;  // Set unread count to 0
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.notificationMessage = '';  // Clear all notifications
    this.unreadCount = 0;
    // Optionally, you can save this status to the backend if needed
  }

}
