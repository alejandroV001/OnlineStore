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
import { SizeGuideComponent } from './size-guide/size-guide.component';
import { ShopAccessoriesComponent } from './shop-accessories/shop-accessories.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ShopMenComponent,
    ShopWomanComponent,
    SizeGuideComponent,
    ShopAccessoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    MaterialModule,
  ]
})
export class ShopModule { }
