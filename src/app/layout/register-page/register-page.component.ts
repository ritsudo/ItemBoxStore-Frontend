import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule } from '@angular/common';
import { RegisterContract } from '../../contracts/registerContract';
import { Router } from '@angular/router';
import { DntCaptchaComponent } from '../../dnt-captcha/component/dnt-captcha.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, DntCaptchaComponent, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  @ViewChild(DntCaptchaComponent) dntCaptchaComponent!: DntCaptchaComponent;


  form: FormGroup = new FormGroup({
    login: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('test@example.com', { nonNullable: true, validators: Validators.required }),
    name: new FormControl<string>('Вася', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl<string>('+712312345678', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('123456Qq', { nonNullable: true, validators: Validators.required }),
    confirmPassword: new FormControl<string>('123456Qq', { nonNullable: true, validators: Validators.required })
  });

  toastr: ToastrService = inject(ToastrService);

  captchaForm: FormGroup = new FormGroup({
    dntCaptchaInputText: new FormControl('', { nonNullable: true, validators: Validators.required }),
    dntCaptchaText: new FormControl('', { nonNullable: true, validators: Validators.required }),
    dntCaptchaToken: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

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
    if (!this.form.valid || !this.dntCaptchaComponent.captchaForm.valid) {
      this.responseMessage = 'форма не валидная';
      return;
    }

    this.registerService
    .submitForm({...this.captchaForm.getRawValue(), ...this.form.getRawValue() })
    .subscribe(
      response => {
      this.responseMessage = `HTTP запрос успешен, Ответное сообщение: ${JSON.stringify(response)}`;
      this.registeredUserLogin = this.form.get('login')?.value;
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
