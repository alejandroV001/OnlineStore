import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'edit-product/:id', component: EditProductComponent, data: {breadcrumb: {alias: 'productDetails'}}},
  {path: 'add-product', component: AddProductComponent, data: {breadcrumb: {alias: 'productDetails'}}},
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
export class AdminRoutingModule { }
