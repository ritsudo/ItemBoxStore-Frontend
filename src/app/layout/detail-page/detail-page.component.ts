import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedItem } from '../../dto/detailedItem.model';
import { categories } from '../../dto/categories';
import { backendUrl } from '../../app.config';
import { DetailedItemService } from '../../services/item/detailedItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule],
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

  constructor (
    private route: ActivatedRoute,
    private detailedItemService: DetailedItemService) {
    
  }

  call() {
    this.authorPhoneShow = true;
  }

  deleteItem() {
    //TODO
  }

  trimData(str: string) {
    return str.substring(0, 16);
  }


  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemId = itemId ? itemId : '';

    this.detailedItemService.getItemById(this.itemId).subscribe(response => {
      this.itemData = response;

      const createdAt = this.itemData.createdAt;
      this.itemData.createdAt = this.trimData(createdAt);
    });

  }


}
