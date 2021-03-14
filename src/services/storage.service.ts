import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  storage: Storage = localStorage;

  constructor() { }

  delete(key: string): void {
    this.storage.removeItem(key);
  }

  store(key: string, stringOrObject: any): void {
    this.storage.setItem(key, JSON.stringify(stringOrObject));
  }

  get(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  clear(): void {
    this.storage.clear();
  }
}
