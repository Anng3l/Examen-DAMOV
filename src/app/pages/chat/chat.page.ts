import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonItemDivider } from "@ionic/angular";
import { AuthPage } from '../auth/auth.page';
import { Message, supabaseService } from 'src/app/Services/supabase.service';
import { FirebaseAuthService } from 'src/app/Services/firebase-auth/firebase-auth.service';
import { Router } from '@angular/router';
import { FirebaseService, ChatMessage } from 'src/app/Services/firebase/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ChatPage implements OnInit {
  messages: ChatMessage[] = [];

  constructor(private chatService: FirebaseService, private router: Router, private authService: FirebaseAuthService) {}

  async ngOnInit() {
    this.messages = await this.chatService.getAllMessages();
  }

  async logout() {
    await this.authService.logout();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}