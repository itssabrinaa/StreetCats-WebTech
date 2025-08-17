import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { UsersMeResponse } from '../_services/api-requests/user-request.type';
import { ApiUserService } from '../_services/api-requests/api-user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  router = inject(Router);
  actRoute = inject(ActivatedRoute);
  apiService = inject(ApiUserService);

  user?: UsersMeResponse['user'];

  ngOnInit(){
    this.loadUser();
  }

  loadUser(){
    this.apiService.getUsersMe().subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: (err) => {
        this.router.navigate(['/login'], {
          queryParams: { unauth: '1' }
        });
      }
    });
  }

  transformText(text: string): string{
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }
}
