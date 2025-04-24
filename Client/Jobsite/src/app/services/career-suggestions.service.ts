import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerSuggestionsService {
private apiUrl = 'http://3.83.129.250:3000/api/v1/career-suggestions'
  constructor(private http:HttpClient) { }

  getCareerSuggestions(userId:number):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json')

    const body = {userId};

    return this.http.post<any>(this.apiUrl,body,{headers})
  }
}
