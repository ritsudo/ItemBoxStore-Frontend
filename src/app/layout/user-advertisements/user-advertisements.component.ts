import { Component } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../dto/item.model';
import { Observable } from 'rxjs';
import { GetAllResult } from '../../dto/getAllResult.model';
import { backendUrl } from '../../app.config';
import { categories } from '../../dto/categories';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-advertisements',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-advertisements.component.html',
  styleUrl: './user-advertisements.component.css'
})

export class UserAdvertisementsComponent {
  category = categories;
  apiUrl = backendUrl;

  userId = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  result!: Observable<GetAllResult>;
  items: Item[] = [];
  updatedItems: Item[] = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userid'];
    });

    this.itemService.getItemsByUserId(this.userId).subscribe(response => {
      this.result = response;
      this.items = response;
    });
  }
}

