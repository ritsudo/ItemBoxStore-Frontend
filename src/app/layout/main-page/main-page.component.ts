import { Component } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../dto/item.model';
import { Observable } from 'rxjs';
import { GetAllResult } from '../../dto/getAllResult.model';
import { backendUrl } from '../../app.config';
import { categories } from '../../dto/categories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent {
  category = categories;
  apiUrl = backendUrl;

  constructor(
    private itemService: ItemService
  ) {}

  result!: Observable<GetAllResult>;
  items: Item[] = [];
  updatedItems: Item[] = [];

  currentPage: number = 1;
  batchSize: number = 10;

  totalPages: number = 0;

  options: number[] = [2,5,10,20,50];

  sortOptionId: number = 0;
  sortOptions: number[] = [0,1,2];
  sortOptionNames: string[] = ['По умолчанию','По имени','По стоимости'];

  searchTerm: string = '';

  updateById(): void {
    this.itemService.getItemsByName(this.searchTerm).subscribe(response => {
      this.result = response;
      this.items.splice(0, this.items.length);
      this.updatedItems = response;
      console.log(this.updatedItems);
      for (let i = 0; i < this.updatedItems.length; i+=1) {
        this.items.push(new Item(this.updatedItems[i].id, this.updatedItems[i].name, this.updatedItems[i].createdAt, this.updatedItems[i].subCategoryId, this.updatedItems[i].location, this.updatedItems[i].price, this.updatedItems[i].mainImageId
        ));
      }
    });
  }

  updateByPage(): void {
    this.itemService.getItemsWithPagination(this.currentPage, this.batchSize, this.sortOptionId).subscribe(response => {
      this.result = response;
      console.log(this.result);
      this.items.splice(0, this.items.length);
      this.updatedItems = response.result;
      this.totalPages = response.totalPages;
      console.log(this.updatedItems);
      for (let i = 0; i < this.updatedItems.length; i+=1) {
        this.items.push(new Item(this.updatedItems[i].id, this.updatedItems[i].name, this.updatedItems[i].createdAt, this.updatedItems[i].subCategoryId, this.updatedItems[i].location, this.updatedItems[i].price, this.updatedItems[i].mainImageId
        ));
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    } else {
      this.currentPage = 1;
    }
    this.updateByPage();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    } else {
      this.currentPage = this.totalPages;
    }
    this.updateByPage();
  }

  confirmSelection(): void {
    this.updateByPage();
  }

  confirmSortSelection(): void {
    this.updateByPage();
  }

  ngOnInit(): void {
    this.itemService.getItemsWithPagination(this.currentPage, this.batchSize, this.sortOptionId).subscribe(response => {
      this.result = response;
      this.items = response.result;
      this.totalPages = response.totalPages;
    });
  }
}

