import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order, OrderItem } from 'src/app/app.classes';
import { OrderService } from 'src/app/service/data/order.service';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  private orderService: OrderService = inject(OrderService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private orderId: string = this.route.snapshot.params['id'];

  order: Order | null = null;

  ngOnInit(): void {
    this.orderService.getOrder(this.orderId).subscribe(
      (data: any) => {
        this.order = data;
      },
      (error: any) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

}
