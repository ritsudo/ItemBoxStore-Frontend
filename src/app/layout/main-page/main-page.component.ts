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

  searchTerm: string = '';

  updateValues(): void {
    
    this.itemService.getItemsByName(this.searchTerm).subscribe(response => {
      this.result = response;
      this.items.splice(0, this.items.length);
      this.updatedItems = response;
      console.log(this.updatedItems);
      for (let i = 0; i < this.updatedItems.length; i+=1) {
        this.items.push(new Item(this.updatedItems[i].id, this.updatedItems[i].name, this.updatedItems[i].subCategoryId, this.updatedItems[i].location, this.updatedItems[i].price, this.updatedItems[i].mainImageId
        ));
      }
    });
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(response => {
      this.result = response;
      this.items = response.result;
    });
  }
}

