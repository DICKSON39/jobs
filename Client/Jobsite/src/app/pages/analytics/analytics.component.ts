import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService, DashboardStats } from '../../services/dashboard.service';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule,FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
 stats!:DashboardStats;

 constructor(private dashboardService : DashboardService) {}

 ngOnInit(): void {
     this.dashboardService.getStats().subscribe(data=> {
      this.stats=data
     })
 }
}
