import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginContract } from '../../contracts/loginContract';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
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


  constructor (
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  continueAuthorization() {
    //save token to cookie
  }

  onSubmit() {
    this.loginService
    .submitForm(this.formData)
    .subscribe(
      response => {
        console.log(response);
      this.responseMessage = `HTTP вход успешен, токен JWT получен. Длина токена: ${response.token.length}`;
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
