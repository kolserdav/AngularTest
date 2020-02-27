import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  credentials = environment.databaseCred;
  firestore: firebase.firestore.Firestore;
  constructor() { 
    firebase.initializeApp(this.credentials);
    this.firestore = firebase.firestore();
  }
}
