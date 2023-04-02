import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopWomanComponent } from './shop-woman/shop-woman.component';
import { ShopMenComponent } from './shop-men/shop-men.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'woman', component: ShopWomanComponent, data: {breadcrumb: {alias: 'shopWoman'}}},
  {path: 'men', component: ShopMenComponent, data: {breadcrumb: {alias: 'shopMen'}}},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
