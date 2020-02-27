import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: any;

  get() {
    return this.storage;
  }

  set(storage: any) {
    this.storage = storage;
  }

  constructor() { }
}
