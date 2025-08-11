import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  router = inject(Router);
  actRoute = inject(ActivatedRoute);

  toastr = inject(ToastrService);

  authService = inject(AuthService);

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      if (params['welcome']) {
        this.toastr.success(`Inizia a pubblicare i tuoi avvistamenti o visualizza quelli degli altri utenti.`,
          `Ciao, ${this.authService.getName()}!`);
      }
    });
  }

  goToNewCat(){
    this.router.navigate(["create-cat"]);
  }
}
