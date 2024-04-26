import { Injectable } from '@angular/core';
import { backendUrl } from '../../app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = backendUrl;

  constructor(private http: HttpClient) {
   }

  submitForm(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/register`, formData);
  }
}
