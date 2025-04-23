import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
   private apiUrl = 'http://54.197.174.28:3000/api/v1/interviews'
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
    `http://3.86.230.2:3000/api/v1/applications/${applicationId}/interviews`
  );
}

}
