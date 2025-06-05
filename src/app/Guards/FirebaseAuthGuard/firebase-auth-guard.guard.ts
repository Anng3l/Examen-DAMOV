import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const firebaseAuthGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/auth']);
        resolve(false);
      }
    });
  });
};