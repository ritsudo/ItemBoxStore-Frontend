import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule } from '@angular/common';
import { RegisterContract } from '../../contracts/registerContract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  formData: RegisterContract = {
    login: '',
    email: 'test@example.com',
    name: 'Вася',
    phone: '+712312345678',
    password: '123456Qq',
    confirmPassword: '123456Qq'
  };

  responseMessage: string = ''; // Property to store response message

  nextButtonShown: boolean = false;
  registeredUserLogin: string = '';


  constructor (
    private registerService: RegisterService,
    private router: Router) {
  }

  continueAuthorization() {
    this.router.navigate(['/login', {login: this.registeredUserLogin}]);
  }

  onSubmit() {
    this.registerService
    .submitForm(this.formData)
    .subscribe(
      response => {
      this.responseMessage = `HTTP запрос успешен, Ответное сообщение: ${JSON.stringify(response)}`;
      this.registeredUserLogin = this.formData.login;
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
}
