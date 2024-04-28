import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginContract } from '../../contracts/loginContract';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CookieService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  formData: LoginContract = {
    login: '',
    password: '123456Qq'
  };

  responseMessage: string = ''; // Property to store response message

  nextButtonShown: boolean = false;

  responseToken: string = '';


  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {
  }

  continueAuthorization() {
    // Assuming this is where you create your JWT
    const expirationTime = 50 * 60 * 1000; // 50 minutes in milliseconds

    // Calculate expiration date
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationTime);
    
    this.cookieService.set('JWT', this.responseToken, expirationDate);
  }

  onSubmit() {
    this.loginService
      .submitForm(this.formData)
      .subscribe(
        response => {
          console.log(response);
          this.responseMessage = `HTTP вход успешен, токен JWT получен. Длина токена: ${response.token.length}. Токен: ${response.token.substring(0, 10)}...`;
          this.responseToken = response.token;
          this.cookieService.set('JWT', this.responseToken);
          this.nextButtonShown = true;
        },
        error => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.responseMessage = `Ошибка: ${error.error.message}`;
            this.nextButtonShown = false;
          } else {
            // Server-side error
            this.responseMessage = `HTTP код ответа: ${error.status}, Сообщение об ошибке: ${JSON.stringify(error.error)}`;
            this.nextButtonShown = false;
          }
        });
  }

  ngOnInit() {
    const login = this.route.snapshot.paramMap.get('login');
    this.formData.login = login ? login : '';
  }

}
