import { Component } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../dto/item.model';
import { Observable } from 'rxjs';
import { GetAllResult } from '../../dto/getAllResult.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent {

  constructor(
    private itemService: ItemService
  ) {}

  result!: Observable<GetAllResult>;
  items: Item[] = [];

  ngOnInit(): void {
    this.itemService.getItems().subscribe(response => {
      this.result = response;
      this.items = response.result;
    });
  }
}

