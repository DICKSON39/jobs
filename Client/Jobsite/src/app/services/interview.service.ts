import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
   private apiUrl = 'http://3.83.129.250:3000/api/v1/interviews/interviews'
  constructor(private http:HttpClient) { }

  createInterview(interviewData: {
    applicationId: number;
    scheduledDate: string;
    status?: string;
    notes?: string;
  }) {
    return this.http.post<any>(this.apiUrl, interviewData);
  }


  // interview.service.ts
getInterviewsByApplication(applicationId: number) {
  return this.http.get<any[]>(
    `http://3.83.129.250:3000/api/v1/interviews/applications/${applicationId}/interviews`
  );
}
 getInterviewById(userId:number):Observable<any> {
  return this.http.get<any>(`http://3.83.129.250:3000/api/v1/interviews/interviews/${userId}`)
 }
}
