import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiAuthService } from '../_services/api-requests/api-auth.service';
import { AuthService } from '../_services/auth/auth.service';
import { LogInResponse } from '../_services/api-requests/auth-request.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router);
  actRoute = inject(ActivatedRoute);

  toastr = inject(ToastrService);

  apiService = inject(ApiAuthService);
  authService = inject(AuthService);

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      if (params['unauth']) {
        this.toastr.warning("Effettuare il Log In per accedere a questa pagina.", "Non autorizzato");
      }
      if (params['signup']) {
        this.toastr.success("Sign Up effettuato con successo, accedi.", "Sei registrato");
      }
    });
  }

  emailSelect = false;
  pwdSelect = false;
  
  showPwd = false;

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    pwd: new FormControl('', [ Validators.required, Validators.minLength(4) ])
  })

  emailSelected(){
    if(!this.emailSelect) this.emailSelect = true;
  }
  pwdSelected(){
    if(!this.pwdSelect) this.pwdSelect = true;
  }

  buttonDisabled(){
    return this.loginForm.invalid;
  }

  handleLogIn(){
    if (!this.loginForm.invalid) {
      this.apiService.login({
        email: this.loginForm.value.email as string,
        pwd: this.loginForm.value.pwd as string,
      }).subscribe({
        next: (res: LogInResponse) => {
          this.authService.updateToken(res.jwt).then(() => {
            this.router.navigate(['/home'], {
              queryParams: { welcome: '1' }
            });
          });
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Errore sconosciuto';
          this.toastr.error(`${errorMsg}`, `Credenziali errate`);
        },
        complete: () => { }
      })
    } 
  }
  
}
