import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/Services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-auth-firebase',
  templateUrl: './auth-firebase.page.html',
  styleUrls: ['./auth-firebase.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput]
})
export class AuthFirebasePage implements OnInit {
  
  
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private router:Router, private authService: FirebaseAuthService) 
  {  
      
  }

  ngOnInit() {
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/chat']);
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      alert('Registro exitoso. Verifica tu correo electrónico.');
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async recoverPassword() {
    try {
      await this.authService.recoverPassword(this.email);
      alert('Correo de recuperación enviado.');
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth']);
    } catch (err: any) {
      this.error = err.message;
    }
  }


}
