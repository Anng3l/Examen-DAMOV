import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  id: string;
  useremail: string;
  content: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class supabaseService {
  private supabase: SupabaseClient;
  private messages$ = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.listenToMessages();
  }

  getMessagesObservable() {
    return this.messages$.asObservable();
  }

  async fetchMessages() {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      this.messages$.next(data);
    }
  }

  async sendMessage(content: string, userEmail: string) {
    await this.supabase.from('messages').insert([{ content, useremail:userEmail }]);
  }

  listenToMessages() {
    this.supabase
      .channel('public:messages')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        this.fetchMessages();
      })
      .subscribe();
  }
}
