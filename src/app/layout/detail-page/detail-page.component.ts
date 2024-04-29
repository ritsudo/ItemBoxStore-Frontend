import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailedItem } from '../../dto/detailedItem.model';
import { categories } from '../../dto/categories';
import { backendUrl } from '../../app.config';
import { DetailedItemService } from '../../services/item/detailedItem';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {
  apiUrl = backendUrl;
  category = categories;

  authorPhoneShow: boolean = false;

  itemData: DetailedItem = {
    description: '',
    authorId: '',
    authorName: '',
    createdAt: '',
    authorPhone: '',
    authorAvatarId: '',
    id: '',
    name: '',
    subCategoryId: 0,
    location: '',
    price: 0,
    mainImageId: '',
  }

  itemId: string = '';

  deleteDetailsShow = false;
  deleteResponseMessage: string = "";

  constructor (
    private route: ActivatedRoute,
    private detailedItemService: DetailedItemService,
    private cookieService: CookieService) {
    
  }

  call() {
    this.authorPhoneShow = true;
  }

  deleteItem() {
    
    this.detailedItemService.deleteItemById(this.itemId, this.cookieService.get('JWT'))
    .subscribe(
      response => {
      this.deleteResponseMessage = `HTTP - удалено успешно...`;
      this.deleteDetailsShow = true;
    },
    error => {
        this.deleteResponseMessage = `HTTP ошибка код ответа: ${error.status} (не авторизирован/нет прав на удаление)`;
        this.deleteDetailsShow = true;
    });
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['id'];
    });

    this.detailedItemService.getItemById(this.itemId).subscribe(response => {
      this.itemData = response;

      const createdAt = this.itemData.createdAt;
    });

  }


}
