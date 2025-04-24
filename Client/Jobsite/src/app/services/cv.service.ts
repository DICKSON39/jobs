import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private apiUrl = 'http://3.83.129.250:3000/api/v1/interviews'

  constructor(private http: HttpClient) { }

  getUserInfo(userId:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/user-profile/${userId}`)
  }
}
