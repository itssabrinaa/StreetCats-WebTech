import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
  styles: ''
})
export class LogoutComponent {

  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  ngOnInit() {
    if(! this.authService.isAuthenticated()){
      this.toastr.warning("You are not currently logged in!");
      this.router.navigateByUrl("/");
    } else {
      this.toastr.success(`Log Out per ${this.authService.name()} effettuato con successo`, "A presto!");
      this.authService.logout();
      this.router.navigateByUrl("/");
    }
  }

}
