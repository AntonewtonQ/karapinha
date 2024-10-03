import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);


  if (authService.isLoggedIn()) {
    return true;
  }
    // Redirect to the login page
    router.navigate(['login']);

    // Show a toast notification
    toast.danger('Faça o login para acessar a essa página','Não Autorizado', 5000);

    return false;
};
