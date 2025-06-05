import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc } from "@angular/fire/firestore"; 
import { getDocs, orderBy, query } from 'firebase/firestore';


//Datos
export interface ChatMessage  {
  userEmail:string,
  image:string,
  idApi:number;
  nombre:string;
  status:string;
  species:string;
  genre:string;
  originPlanet:string;
  currentLocaton:string;
  comentario:string;

  photo:string;
  date:string;
  profilePhoto:string;
}



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore:Firestore) {

  }

  sendContent(
  userEmail: string,
  image:string,
  idApi:number,
  nombre:string,
  status:string,
  species:string,
  genre:string,
  originPlanet:string,
  currentLocaton:string,
  comentario:string,
  photo:string,
  date:string,
  profilePhoto:string)
  {
    const messagesRef=collection(this.firestore, "Actividad en clase Angel Maldonado")
    const characterData:ChatMessage={
      userEmail,
      image,
      idApi,
      nombre,
      status,
      species,
      genre,
      originPlanet,
      currentLocaton,
      comentario,
      photo,
      date,
      profilePhoto
    }
    
    return addDoc(messagesRef, characterData)
  }

  async getAllMessages(): Promise<ChatMessage []> {
    const messagesRef = collection(this.firestore, 'Actividad en clase Angel Maldonado');
    const q = query(messagesRef, orderBy('date', 'desc')); // orden descendente por fecha
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as ChatMessage );
  }
}
