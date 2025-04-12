import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';


@Component({
  selector: 'app-register-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  
     
    private fb = inject(FormBuilder)

    form= this.fb.group({
      fullName:[,[Validators.required]],
      email:[,[Validators.required,Validators.email,this.unAllowedNames]],
      password:[,[Validators.required,Validators.minLength(8)]],
      confirmPassword:[,[Validators.required,Validators.minLength(8),this.passwordMatchValidator]],
      termsAccepted:[,[Validators.required,Validators.requiredTrue]]
    })

    onRegister(){
      alert("You are registered!")
      console.log(this.form)
    }
    unAllowedNames(control:AbstractControl):ValidationErrors|null {
      const value = control.value
  
      if(value == "hacker@gmail.com"){
        return {unAllowedNames:true, message: 'Invalid email'}
      }
      return null
    }

    passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    }

  constructor (private router:Router){}

  navigateToEmployee(){
    this.router.navigate(['/employee'])
  }
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
    
    
      
}
