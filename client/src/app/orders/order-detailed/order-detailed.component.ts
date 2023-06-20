import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order!: IOrder;
  orderId$: Observable<number>;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, 
      private ordersService: OrdersService) {
    this.breadcrumbService.set('@OrderDetailed', '');
   }

  ngOnInit():void {
    const orderId = +localStorage.getItem('orderId')!;
    if (orderId) {
      this.ordersService.setOrderId(orderId);
    }
    this.orderId$ = this.ordersService.orderId$;

    var id = 0;
    this.orderId$.subscribe(response => {
      id = response;
    });
    
    this.ordersService.getOrderDetailed(id)
      .subscribe((order: any) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order - ${order.status}`);
      }, error => {
        console.log(error);
      })
  }

}
