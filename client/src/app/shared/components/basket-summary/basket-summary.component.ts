import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasket, IBasketItem } from '../../models/basket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() items!: any[] ;
  @Input() isOrder = true;

  mainPhoto: string;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.items);
   this.items.forEach(element => {
      if(element.pictureUrl == null)
      {
        element.pictureUrl = "https://res.cloudinary.com/alejandroscloud/image/upload/v1680102891/no_image_product_nctina.png";
      }
   });
  }

  goTo(id: number)
  {
    this.router.navigateByUrl("/shop/"+ id);
  }

  decrementItemQuantity(item: IBasketItem){
    if(item.quantity >= 2)
      this.decrement.emit(item);
  }
  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item);
  }
  removeBasketItem(item: IBasketItem){
    this.remove.emit(item);
  }
}
