import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewItemContract } from '../../contracts/newItemContract';
import { NewItemService } from '../../services/newItem/newItem.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CookieService],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css'
})
export class CreatePageComponent {
  formData: NewItemContract = {
    name: '',
    subCategoryId: 5,
    description: 'Default description',
    location: 'Севастополь',
    price: 100
  };

  responseMessage: string = ''; // Property to store response message

  nextButtonShown: boolean = false;
  registeredUserLogin: string = '';


  constructor (
    private newItemService: NewItemService,
    private cookieService: CookieService) {
  }

  onSubmit() {
    this.newItemService
    .submitForm(this.formData, this.cookieService.get('JWT'))
    .subscribe(
      response => {
      this.responseMessage = `HTTP запрос успешен, объявление создано: ${JSON.stringify(response)}`;
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
