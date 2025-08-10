import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiAuthService } from '../_services/api-requests/api-auth.service';

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  router = inject(Router);
  apiService = inject(ApiAuthService);
  toastr = inject(ToastrService);

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(16),
      Validators.pattern(PWD_REGEX)]),
    pwd2: new FormControl('', [Validators.required])
  })

  showPwd = false;
  showPwd2 = false;

  nameSelect = false;
  emailSelect = false;
  pwdSelect = false;
  pwd2Select = false;

  nameSelected(){
    if(!this.nameSelect) this.nameSelect = true;
  }
  emailSelected(){
    if(!this.emailSelect) this.emailSelect = true;
  }
  pwdSelected(){
    if(!this.pwdSelect) this.pwdSelect = true;
  }
  pwd2Selected(){
    if(!this.pwd2Select) this.pwd2Select = true;
  }

  pwdConfirmed(){
    return ((this.signupForm.value.pwd as string) === (this.signupForm.value.pwd2 as string))
  }
  buttonDisabled(){
    return this.signupForm.invalid || !this.pwdConfirmed();
  }

  handleSignUp(){
    if (!this.signupForm.invalid) {
      this.apiService.signup({
        name: this.signupForm.value.name as string,
        email: this.signupForm.value.email as string,
        pwd: this.signupForm.value.pwd as string,
      }).subscribe({
        error: (err) => {
          const errorMsg = err.error?.error || 'Errore sconosciuto';
          this.toastr.error(`${errorMsg}`, `Credenziali non valide`);
        },
        complete: () => {
          this.router.navigate(['/login'], {
              queryParams: { signup: '1' }
          });
        }
      })
    }
  }

}
