import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environmnet';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl =environment.apiUrl
  
 

  constructor(private http: HttpClient,private location:Location,private router:Router) { }

  registerUser(userData: any){
    return this.http.post(`${this.apiUrl}/auth/register`,userData)
}

getCurrentUser() {
  const user = localStorage.getItem('user'); // Or sessionStorage, or JWT decode
  return user ? JSON.parse(user) : null;
}
 


loginUser(userData: any): Observable<any> {
  return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/auth/login`, userData).pipe(
    tap((response) => {
      //console.log("Received token:", response.token); // ✅ Debug this!
      // Store the token and user info in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));  // Optional: Store user info
    }),
    catchError((error) => {
      console.error('Login error:', error);  // Log the error for debugging
      // Optionally: Display an error message to the user (e.g., via a snackbar or alert)
      throw error;  // Rethrow to allow other parts of the app to handle it
    })
  );
}

// Redirect to a protected page after successful login
redirectAfterLogin(): void {
  this.router.navigate(['/dashboard']); // Change to your protected route
}




logoutUser(): void {
  // Clear storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.clear();

  // Clear browser history (optional)
  this.location.replaceState('');

  // Navigate to login and refresh
  this.router.navigate([''],{replaceUrl:true}).then(() => {
    window.location.reload();
  });
}

  getUserId(): string {
    const token = localStorage.getItem('authToken');
//console.log("Stored Token:", token);
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      //console.log("Decoded JWT payload:", decodedPayload); // 👈 ADD THIS
      return decodedPayload.userId;  // It should match the backend payload
    }
    return '';
  }
  

jwt_decode(token: string): { userId: string } {
  // A basic implementation using atob to decode the payload
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));
  return { userId: decodedPayload.userId };
}
}
