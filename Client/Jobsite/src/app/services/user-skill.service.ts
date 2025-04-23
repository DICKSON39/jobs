import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  private apiUrl = 'http://54.197.174.28:3000/api/user-skills';
  constructor(private http:HttpClient) { }

  createUserSkill(userSkill: {
    userId:number;
    skillId:number;
    yearsExperience:number;

  }): Observable<any> {
    return this.http.post(this.apiUrl,userSkill)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  
}
