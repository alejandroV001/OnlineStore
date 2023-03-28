import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Photo } from 'src/app/shared/models/photo';
import { PhotoPicture } from 'src/app/shared/models/photoPicture';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;
  mainPhoto: string;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    var mainPhotoData = this.product.pictures.filter(ph =>ph.isMain == true);
    this.mainPhoto = mainPhotoData[0].url;
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
