import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders!: IOrder[];

  constructor(private ordersService: OrdersService,private router:Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.ordersService.getOrdersForUser().subscribe((orders: any) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }

  getOrderLink(id: number)
  {
    this.ordersService.setOrderId(id);
    this.router.navigate(['/orders', 'order-details']);
  }

}
