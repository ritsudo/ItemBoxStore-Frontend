import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllResult } from '../../dto/getAllResult.model';
import { backendUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class DetailedItemService {
  private apiUrl = backendUrl;

  constructor(
    private http: HttpClient
  ) { }

  getItemById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/Item/${id}`);
  }

  deleteItemById(id: string, jwtToken: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.delete<any>(`${this.apiUrl}/Item/${id}`, {headers: headers});
  }
}
