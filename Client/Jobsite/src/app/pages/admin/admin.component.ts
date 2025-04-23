import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {
  users:any[] = [];
  constructor(private router:Router,private userService:UserService){}

  navigateToAiChecker(){
    this.router.navigate(['/aiChecking']);
  }

  navigateToSecurityPolicy(){
    this.router.navigate(['/adminSecurity']);
  }
  navigateToAiMonitoring(){
    this.router.navigate(['/adminAiMonitoring'])
  }
  navigateToAnalytics() {
    this.router.navigate(['/analysis']);

  }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    })
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('User deleted successfully', response);
        // Filter out the deleted user from the local array to update the view
        this.users = this.users.filter(user => user.id !== userId);
      },
      error: (err) => {
        console.error('Failed to delete user:', err);
      }
    });
  }
  
  




}
