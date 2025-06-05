import { Injectable } from '@angular/core';
import { supabase } from 'src/app/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  async uploadFile(file: File, bucket: string, path: string): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error subiendo archivo:', error.message);
      return null;
    }

    return data.path;
  }

  async getPublicUrl(bucket: string, path: string): Promise<string> {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}