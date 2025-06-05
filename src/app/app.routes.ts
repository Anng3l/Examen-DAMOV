import { provideRouter, Routes } from '@angular/router';
import { authGuardGuard } from './Guards/AuthGuard/auth-guard.guard';
import { firebaseAuthGuardGuard } from './Guards/FirebaseAuthGuard/firebase-auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  /*
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },*/
  {
    path: 'home', //Consumo de la api
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    
    //canActivate: [authGuardGuard]
    canActivate: [firebaseAuthGuardGuard]
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'chat', //Chat
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage),
    
    //canActivate: [authGuardGuard]
    canActivate: [firebaseAuthGuardGuard]
  },
  {
    path: 'detalles', //Detalles del api
    loadComponent: () => import('./pages/detalles/detalles.page').then( m => m.DetallesPage),
    
    //canActivate: [authGuardGuard]
    canActivate: [firebaseAuthGuardGuard]
  },
  {
    path: 'storage',
    loadComponent: () => import('./pages/storage/storage.page').then( m => m.StoragePage),
    canActivate: [firebaseAuthGuardGuard]
  },

  
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth-firebase/auth-firebase.page').then( m => m.AuthFirebasePage)
  },


];


export const appRouting = provideRouter(routes);