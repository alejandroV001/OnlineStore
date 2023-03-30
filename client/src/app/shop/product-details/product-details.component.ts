import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct
  quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, 
    private bcService: BreadcrumbService, private basketService: BasketService) {
      this.bcService.set('@productDetails', ' ');
     }

  ngOnInit(): void {
    this.loadProduct();
  }
  
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 1)
      this.quantity--;
  }

  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(product => {
      this.product = product;
      var mainPhotoData = this.product.pictures.filter(ph =>ph.isMain == true);
      if(mainPhotoData.length > 0)
      {
        this.product.pictureUrl = mainPhotoData[0].url;
      }
      else
      this.product.pictureUrl = environment.imageALt;
      this.bcService.set('@productDetails', product.productName)
    }, error => {
      console.log(error);
    });
  }
}
