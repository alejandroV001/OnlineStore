import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;
  mainPhoto: string;
  discountedPrice?: number;

  constructor(private basketService: BasketService,private shopService: ShopService,
     private router: Router) { }

  ngOnInit(): void {
    var mainPhotoData = this.product.pictures.filter(ph =>ph.isMain == true);
    if(mainPhotoData.length > 0)
    {
      this.mainPhoto = mainPhotoData[0].url;
      this.product.pictureUrl = mainPhotoData[0].url;
    }
    else
      {
      this.mainPhoto = environment.imageALt;
      this.product.pictureUrl = environment.imageALt;
    }

    this.checkDiscountForProduct();

  }

  checkDiscountForProduct()
  {
    this.shopService.checkDiscountProduct(this.product.id).subscribe(response => {
      const currentDate = new Date();
      response.forEach(discount => {
        const discountStartingDate = new Date(discount.startingDate);
        const discountEndDate = new Date(discount.endDate);

        if(discountStartingDate <= currentDate && discountEndDate > currentDate)
        {
          const discountAmount = this.product.price * discount.value / 100;
          this.discountedPrice = this.product.price - discountAmount;
          this.product.priceDiscounted = this.discountedPrice;
        }
      });
    })
    
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }

  addItemToWhishlist(){
    this.basketService.addItemToWhishlist(this.product);
  }

  goTo(id: number)
  {
    this.router.navigateByUrl("/shop/"+ id);
  }
}
