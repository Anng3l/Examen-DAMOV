import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class StoragePage {
  selectedFile: File | null = null;
  uploadedUrl: string | null = null;

  constructor(private storageService: StorageService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async upload() {
    if (!this.selectedFile) return;

    const fileName = `uploads/${Date.now()}_${this.selectedFile.name}`;
    const bucket = 'archivos';

    const path = await this.storageService.uploadFile(this.selectedFile, bucket, fileName);
    if (path) {
      this.uploadedUrl = await this.storageService.getPublicUrl(bucket, path);
      console.log('Archivo subido. URL pública:', this.uploadedUrl);
    }
  }
}