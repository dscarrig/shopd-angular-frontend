import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../../service/data/shop-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { ShopdItem } from '../../app.classes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css'],
  imports: [CommonModule]
})
export class ShopItemComponent {
  private shopItemService: ShopItemService = inject(ShopItemService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);

  shopItems!: ShopdItem[];

  id: string = this.route.snapshot.params['id'];
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  shopItem: ShopdItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.shopItem = new ShopdItem(this.id, this.name, this.description, this.price, this.imageUrl, '', false, 0, '');

    if (this.id !== '-1') {
      this.shopItemService.retrieveItem(this.id).subscribe(
        (data: ShopdItem) => {
          this.shopItem = data;
          console.log('Retrieved item:', this.shopItem);
        }
      );
    }
  }

  addItemToCart(item: ShopdItem) {
    const userId = this.authenticationService.getAuthenticatedUserId();
    if (userId) {
      this.router.navigate(['/cart']);
    }
  }

}
