import { Injectable } from '@angular/core';
import { backendUrl } from '../../app.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiUrl = backendUrl;

  constructor(private http: HttpClient) {
   }

  submitForm(fileData: any, itemId: any, jwtToken: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/Item/image-change/${itemId}`, fileData, {headers: headers});
  }
}
