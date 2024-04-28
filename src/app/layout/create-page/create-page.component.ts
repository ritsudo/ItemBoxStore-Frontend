import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewItemContract } from '../../contracts/newItemContract';
import { NewItemService } from '../../services/newItem/newItem.service';
import { CookieService } from 'ngx-cookie-service';
import { FileService } from '../../services/file/file.service';

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

  responseItemId: string = '';
  selectedFile: File | null = null;

  responseMessage2: string = ''; // Property to store response message

  constructor(
    private newItemService: NewItemService,
    private cookieService: CookieService,
    private fileService: FileService) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.log('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.fileService.submitForm(formData, this.responseItemId, this.cookieService.get('JWT'))
      .subscribe(
        response => {
          this.responseMessage2 = `HTTP загрузка файла прошла успешно}`;
        },
        error => {
          this.responseMessage2 = `HTTP ошибка, код ответа: ${error.status}, Сообщение об ошибке: ${JSON.stringify(error.error)}`;
        }

      )
  }

  onSubmit() {
    this.newItemService
      .submitForm(this.formData, this.cookieService.get('JWT'))
      .subscribe(
        response => {
          this.responseMessage = `HTTP запрос успешен, объявление создано: ${JSON.stringify(response)}`;
          this.responseItemId = response.result;
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
