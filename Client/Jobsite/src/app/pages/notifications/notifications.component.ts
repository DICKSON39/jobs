import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../services/interview.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  userId!: number; // Declare userId as a number and assert definite assignment

  constructor(private interviewService: InterviewService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUser(); // Call the method to get the user ID
    this.interviewService.getInterviewById(this.userId).subscribe({
      next: (data) => this.notifications = data,
      error: (err) => console.error('Error loading interviews:', err)
    });
  }
}