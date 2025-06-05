import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DatosCompartidosService } from '../../Services/datos/datos-compartidos.service';
import { FirebaseService } from '../../Services/firebase/firebase.service';

import { IonicModule } from "@ionic/angular";
import { StorageService } from 'src/app/Services/storage/storage.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/Services/firebase-auth/firebase-auth.service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [
  IonicModule,
  CommonModule, FormsModule
]
})
export class DetallesPage implements OnInit {
  characterData:any;
  userEmail=""
  image=""
  idApi=0
  nombre=""
  status=""
  species=""
  genre=""
  originPlanet=""
  currentLocaton=""
  comentario=""
  photo=""
  date=""
  profilePhoto=""

  constructor(private dataService:DatosCompartidosService, private datosEnvio:FirebaseService, private storageService: StorageService, private router:Router, private authService: FirebaseAuthService) { }

  ngOnInit() {
    this.characterData = this.dataService.getPersonajeCompartido();
    console.log("GetPersonajeCompartido: ", this.dataService.getPersonajeCompartido())
    console.log("Character data: ", this.characterData);
  }


  selectedFile: File | null = null;
  uploadedUrl: string | null = "";
  _uploadedUrl: string = "";

  async sendContent() {
    const user = await this.authService.currentUser; // o el método correcto en tu servicio
    this.userEmail = user?.email || "";
    this.image=this.characterData.image
    this.idApi=this.characterData.id
    this.nombre=this.characterData.name
    this.status=this.characterData.status
    this.species=this.characterData.species
    this.genre=this.characterData.gender
    this.originPlanet=this.characterData.origin.name
    this.currentLocaton=this.characterData.location.name
    this.comentario
    this.photo = this._uploadedUrl;
    this.date = Date.now().toString();
    this.profilePhoto = user?.photoURL || "";
    
    this.datosEnvio.sendContent(this.userEmail, this.image,this.idApi, this.nombre, this.status, this.species, this.genre, this.originPlanet, this.currentLocaton,this.comentario, this.photo, this.date, this.profilePhoto
    );
  }


  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  navigateToHome():void {
    this.router.navigate(["/home"]);
  }
}
