import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;
  mainPhoto: string;

  constructor(private basketService: BasketService, private router: Router) { }

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
