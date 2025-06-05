import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firebaseAuthGuardGuard } from './firebase-auth-guard.guard';

describe('firebaseAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firebaseAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
