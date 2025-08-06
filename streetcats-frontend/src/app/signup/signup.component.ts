import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?/]{8,}$/; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  router = inject(Router);
  submitted = false;
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(16),
      Validators.pattern(PWD_REGEX)])
  })

  handleSignUp(){
    this.submitted = true;
    if (!this.signupForm.invalid) {
      this.router.navigateByUrl("/home");
    }
  }

}
