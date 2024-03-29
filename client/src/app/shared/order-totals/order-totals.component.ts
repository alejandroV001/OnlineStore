import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { ShopService } from 'src/app/shop/shop.service';
import { IBasketTotals } from '../models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  @Input() shippingPrice!: number;
  @Input() subtotal!: number;
  @Input() total!: number;
  @Input() discount!: number;
  coupon = '';
  couponDiscount: number | null = null;
  basketTotals$!: Observable<IBasketTotals>;
  sumary: number | null = 0;
  error: boolean= false;

  constructor(private basketService:BasketService, private shopService: ShopService) {
   }

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotal$;

    if(this.discount == -1)
    {
      this.sumary = null;
    }
    else if(this.discount == 1)
    {
      this.sumary = null;
    }
    else {
      this.sumary = 1;
      this.couponDiscount = this.discount;
    }
  }
  
  applyCoupon() {
    var discount = 0;
    const discountValue = this.shopService.getCupons();
    discountValue.subscribe(response => {
      const foundCupon = response.find(item => item.cuponName === this.coupon);
      if (foundCupon) {
        discount = foundCupon.value;
        this.couponDiscount = this.subtotal * discount / 100;
        this.basketService.setDiscountValue(this.couponDiscount);
      }
      else
        this.error = true;
    });
  }

  resetCouponDiscount()
  {
    this.couponDiscount = null;
    this.basketService.setDiscountValue(0);
  }

}
