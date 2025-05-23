import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
 
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService)

  form2: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, this.unAllowedNames]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  unAllowedNames(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'hacker@gmail.com') {
      return { unAllowedNames: true };
    }
    return null;
  }


  onSubmit() {
    if (this.form2.valid) {
      this.authService.loginUser(this.form2.value).subscribe({
        next: (res) => {
          const role = res.user?.role?.roleName;
  
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role === 'RECRUITER') {
            this.router.navigate(['/employee']);
          } else if (role === 'JOB_SEEKER') {
            this.router.navigate(['/jobseeker']);
          } else {
            alert('Unknown role');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    } else {
      this.form2.markAllAsTouched();
    }
  }


 
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
