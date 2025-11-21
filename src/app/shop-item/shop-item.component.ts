import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../service/data/shop-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/app/basic-authentication.service';

export class ShopItem {
  constructor(
    public id: number,
    public itemName: string,
    public description: string,
    public price: number,
    public picture: string

  ) { }
}

@Component({
  selector: 'app-shop-item',
  imports: [],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.css'
})
export class ShopItemComponent {
  private shopItemService = inject(ShopItemService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private basicAuthService = inject(BasicAuthenticationService);

  shopItems!: ShopItem[];

  id: number = this.route.snapshot.params['id'];
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  shopItem: ShopItem = new ShopItem(this.id, this.name, this.description, this.price, this.imageUrl);

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.shopItem = new ShopItem(this.id, this.name, this.description, this.price, this.imageUrl);

    if (this.id !== -1) {
      this.shopItemService.retrieveItem(this.id).subscribe(
        (data: ShopItem) => this.shopItem = data
      );
    }
  }

}
