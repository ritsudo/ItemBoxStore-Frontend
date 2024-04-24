import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllResult } from '../../dto/getAllResult.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:44315'; // Replace with your API endpoint URL

  constructor(
    private http: HttpClient
  ) { }

  getItems() {
    return this.http.get<any>(`${this.apiUrl}/Item/all`);
  }
}
