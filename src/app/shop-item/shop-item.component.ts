import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../service/data/shop-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';
import { ShopdItem } from '../app.constants';

@Component({
  selector: 'app-shop-item',
  imports: [],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.css'
})
export class ShopItemComponent {
  private shopItemService = inject(ShopItemService);
  private route = inject(ActivatedRoute)

  shopItems!: ShopdItem[];

  id: string = this.route.snapshot.params['id'];
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  shopItem: ShopdItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.shopItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

    if (this.id !== '-1') {
      this.shopItemService.retrieveItem(this.id).subscribe(
        (data: ShopdItem) => this.shopItem = data
      );
    }
  }

}
