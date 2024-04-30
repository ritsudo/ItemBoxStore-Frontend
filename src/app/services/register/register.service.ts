import { Injectable } from '@angular/core';
import { backendUrl } from '../../app.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisterContract } from '../../contracts/registerContract';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = backendUrl;

  constructor(private http: HttpClient) {
   }

  submitForm(register: RegisterContract): Observable<any> {
    const data: string = new HttpParams({ fromObject: { ...register } }).toString();

    return this.http.post<any>(`${this.apiUrl}/User/register`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
