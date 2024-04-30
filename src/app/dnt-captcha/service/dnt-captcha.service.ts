import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DntCaptchaParams } from '../interfaces/dnt-captcha-params.interface';
import { ToastrService } from 'ngx-toastr';
import { backendUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class DntCaptchaService {
  backendUrl = backendUrl;
  http: HttpClient = inject(HttpClient);

  notificationService: ToastrService = inject(ToastrService);

  getDntCaptchaParams(): Observable<DntCaptchaParams> {
    return this.http.get<DntCaptchaParams>(`${this.backendUrl}/User/register`).pipe(
      catchError((err) => {
        if (err.status === 429) {
          this.notificationService.error('Too many requests for captcha generation.', 'Error');
        }

        return throwError(err);
      })
    );
  }
}
