import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      if (params['unauth']) {
        console.log("unauth");
        this.toastr.warning("Effettuare il Log In per accedere a questa pagina.", "Non autorizzato");
      }
    });
  }

  submitted = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(16)])
  })

  handleLogIn(){
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.router.navigateByUrl("/home");
    }
  }
}
