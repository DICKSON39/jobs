import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
 
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]), 
    remember: new FormControl('',[Validators.required])
  })

  private fb = inject(FormBuilder)

  form2 =  this.fb.group({
    email:[,[Validators.required,Validators.email,this.unAllowedNames]],
    password:[,[Validators.required,Validators.minLength(0)]],
    remember:[,[Validators.required]]
  })

  constructor(private router:Router) {}

  

  navigateToAdmin(){
    this.router.navigate(['/admin'])
  }
  

  navigateToRegister(){
    this.router.navigate(['/register'])
  }

  
 


  onSubmit(){
    console.log(this.form)
    alert("You is Logged in")
  }
  unAllowedNames(control:AbstractControl):ValidationErrors|null {
    const value = control.value

    if(value == "hacker@gmail.com"){
      return {unAllowedNames:true, message: 'Invalid email'}
    }
    return null
  }
  
}
