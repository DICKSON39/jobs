import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobSkillService {
  private apiUrl = `http://54.197.174.28:3000`;

  constructor(private http:HttpClient) { }

  addSkillToJob(jobId:number,skillId:number):Observable<any> {
    return this.http.post<any>(`http://3.83.129.250:3000/api/v1/job-skills/job-skills`,{jobId,skillId})
  }

  getAllSkills(): Observable<any[]> {
    return this.http.get<any[]>(`http://3.83.129.250:3000/api/v1/skills/skills`)
  }

  getSkillsForJob(jobId: number) {
    return this.http.get<any[]>(`http://3.83.129.250:3000/api/v1/job-skills/${jobId}`);
  }
  

 
}
