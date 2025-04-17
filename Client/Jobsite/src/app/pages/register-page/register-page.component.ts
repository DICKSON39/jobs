import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.unAllowedNames]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: ['3', [Validators.required]], // 1-admin, 2-recruiter, 3-jobseeker
      termsAccepted: [false, [Validators.requiredTrue]],
    },
    { validators: this.passwordMatchValidator }
  );

  constructor(private authService: AuthService, private router: Router) {}

  get f() {
    return this.form.controls;
  }

  onRegister() {
    if (this.form.invalid) return;

    const { fullName, email, password, role } = this.form.value;

    const userPayload = {
      name: fullName,
      email,
      password,
      role_id: parseInt(role!, 10)
    };

    this.authService.registerUser(userPayload).subscribe({
      next: (res) => {
        console.log('User registered successfully', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error', err);
      }
    });
  }

  unAllowedNames(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'hacker@gmail.com') {
      return { unAllowedNames: true };
    }
    return null;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
   
}
