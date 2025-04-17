import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environmnet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl =environment.apiUrl

  constructor(private http: HttpClient) { }

  registerUser(userData: any){
    return this.http.post(`${this.apiUrl}/auth/register`,userData)
}
  loginUser(userData:any) {
    return this.http.post(`${this.apiUrl}/auth/login`,userData)
  }
  }

