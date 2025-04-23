import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environment/environmnet';

export interface User {
  id:number;
  name: number;
  email: number;
  password?: number;
  role_id:number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl =environment.apiUrl


  constructor(private http: HttpClient) { }

 getUsers():Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/user`,{
    withCredentials:true
  })
 }
 deleteUser(userId: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
}
}
