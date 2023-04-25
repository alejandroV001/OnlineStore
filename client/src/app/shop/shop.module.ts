import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { AdminModule } from '../admin/admin.module';
import { ShopMenComponent } from './shop-men/shop-men.component';
import { ShopWomanComponent } from './shop-woman/shop-woman.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ShopMenComponent,
    ShopWomanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    MaterialModule
  ]
})
export class ShopModule { }
