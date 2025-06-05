import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { supabase } from 'src/app/supabase.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput]
})
export class ResetPasswordPage {

  password = "";
  
  constructor(private router: Router) { }

  resetPassword = async () => {
    try
    {
      await supabase.auth.updateUser({ password: this.password })
      alert("Cambió su contraseña exitosamente")
      this.router.navigate(["/auth"]);
    }
    catch(e)
    {
      alert("Error al cambiar la contraseña")
    }
    
  }

}
