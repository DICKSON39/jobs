import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = `http://3.83.129.250:3000`;
  private applyUrl = `http://3.83.129.250:3000/api/v1/applications`;

  constructor(private http: HttpClient) {}

  addJob(jobData: Job): Observable<any> {
    return this.http.post<any>(`http://3.83.129.250:3000/api/job`, jobData);
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/jobs`);
  }

  getJobById(jobId: string): Observable<any> {
    return this.http.get<any>(`http://3.83.129.250:3000/api/job/${jobId}`);
  }

  applyForJob(jobId: string,userId:string) {
    return this.http.post<any>(
      `http://3.83.129.250:3000/api/v1/applications/applications/${jobId}`,
      {jobId,userId}
    );
  }
}
