import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { supabase } from 'src/app/supabase.client';

export const authGuardGuard: CanActivateFn = async () => {
  const router = inject(Router);

  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
