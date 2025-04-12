import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  markAllAsRead(){
    // Logic to mark all notifications as read
    console.log('All notifications marked as read');
    alert('All notifications marked as read');
  }
}
