import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  private apiUrl = 'http://3.83.129.250:3000/api/v1/user-skills/user-skills';
  constructor(private http:HttpClient) { }

  createUserSkill(userSkill: {
    userId:number;
    skillId:number;
    yearsExperience:number;

  }): Observable<any> {
    return this.http.post(this.apiUrl,userSkill)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`http://3.83.129.250:3000/api/v1/users/users`);
  }

  
}
