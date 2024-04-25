import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllResult } from '../../dto/getAllResult.model';
import { backendUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = backendUrl;

  constructor(
    private http: HttpClient
  ) { }

  getItemsByName(name: string) {
    return this.http.get<any>(`${this.apiUrl}/Item/by-name?Name=${name}`);
  }

  getItems() {
    return this.http.get<any>(`${this.apiUrl}/Item/all`);
  }
}
