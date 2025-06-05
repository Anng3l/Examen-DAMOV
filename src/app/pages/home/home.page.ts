
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonInput } from '@ionic/angular/standalone';

import { IonicModule } from "@ionic/angular"
import { HttpClient } from '@angular/common/http';
import { every, firstValueFrom, Subscription } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { DatosCompartidosService } from '../../Services/datos/datos-compartidos.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/Services/firebase-auth/firebase-auth.service';

import { StorageService } from 'src/app/Services/storage/storage.service';
import { getAuth, onAuthStateChanged, updateProfile, User } from 'firebase/auth';

@Component({
  selector: 'app-home', 
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})

export class HomePage implements OnInit {
  characters: any[] = [];

  limit = 1;
  loading = false;

  characterName:string = "";
  characterData:any=null;

  userPhotoUrl: string | null = "";

  userName: string | null = "";

  constructor(private http: HttpClient, private dataService: DatosCompartidosService, private router:Router, private authService:FirebaseAuthService, private storageService:StorageService) {}

  ngOnInit() {
  this.loadCharacters();

  this.authService.user$.subscribe(user => {
    if (user) {
      this.userPhotoUrl = user.photoURL || null;
      this.userName = user.email;

    } else {
      this.userPhotoUrl = null;
      console.log("Usuario no autenticado");
    }
  });
}


  
  

  loadCharacters(event?: any) {
    if (this.loading) return;
    this.loading = true;

    this.http
      .get<any>(`https://rickandmortyapi.com/api/character/?page=${this.limit}`)
      .subscribe((res) => {
        console.log("Resultados: ", res)
        this.characters = [...this.characters, ...res.results];
        this.limit++;
        console.log(`https://rickandmortyapi.com/api/character/?page=${this.limit}`)
        this.loading = false;

        if (event) {
          event.target.complete();
        }

        // Desactiva scroll si ya no hay más Pokémon
        if (res.next === null && event) {
          event.target.disabled = true;
        }
      });
  }

  getImageUrl(index: number): string {
    return `https://rickandmortyapi.com/api/character/avatar/${index + 1}.jpeg`;
  }

  datosCompartidos(datos:any) {
    this.dataService.setDatos(datos)
  }

  getCharacterData(name:string) {
    this.characterName = "";
    this.characterData = null;
    console.log(name)

    
    this.http
      .get<any>(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .subscribe((res) => {
        this.characterData = res;
        console.log(this.characterData)
        this.datosCompartidos(this.characterData);
      });
  }

  navigateToPage(detalles:string, personaje:any):void {
    this.router.navigate([detalles]);
    this.dataService.setPersonajeCompartido(personaje);
    console.log("Compartido zzzzzzzzzzzzzzz: ", personaje);
  }

  navigateToNews(detalles:string):void {
    this.router.navigate([detalles]);
  }










  selectedFile: File | null = null;
  uploadedUrl: string | null = null;
  uploadConfirmation: boolean = false;

  

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
      this._uploadedUrl = this.uploadedUrl;
      this.uploadedPhotoUrl = this.uploadedUrl;
      console.log("_uploadedUrl: ", this._uploadedUrl);
      if (this.uploadedUrl) 
      {
        this.uploadConfirmation = true;
      }

      console.log('Archivo subido. URL pública:', this.uploadedUrl);
    }
  }

  async uploadPhotoUrlToFirebase(): Promise<void> {
  try {
    const user = await firstValueFrom(this.authService.user$);
    console.log(user);
    if (!user) {
      alert("No hay usuario autenticado.");
      return;
    }

    if (!this.uploadedUrl) {
      alert("No hay URL de imagen cargada.");
      return;
    }

    await updateProfile(user, { photoURL: this.uploadedUrl });

    alert("Foto de perfil actualizada con éxito.");
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    alert("Hubo un error al actualizar la foto de perfil.");
  }
}


  
  //Para subir el url automáticamente cuando haya un cambio
  private _uploadedUrl: string | null = null;

  get uploadedPhotoUrl(): string | null {
    return this._uploadedUrl;
  }

  set uploadedPhotoUrl(value: string | null) {
    this._uploadedUrl = value;
    if (value) {
      this.uploadPhotoUrlToFirebase();
    }
  }



  //Para mostrar la foto del usuario cuando cargue la página
  async viewUserPhoto() {
    let user = await firstValueFrom(this.authService.user$);

    if (user)
    {
      this.userPhotoUrl = user.photoURL || null;
      console.log("Foto: ", this.userPhotoUrl)
    }
  }
  
}