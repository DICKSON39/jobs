import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalJobs: number;
  totalApplications: number;
  totalUsers: number;
  totalSkills: number;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://54.197.174.28:3000/api/v1/analysis/dashboard-stats'

  constructor(private http:HttpClient) { }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl)
  }
}
