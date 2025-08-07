import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(authService.isUserAuthenticated()){
    return true;
  } else {
    return router.createUrlTree(['/login'], {
      queryParams: { unauth: '1' }
    });
  }
};
