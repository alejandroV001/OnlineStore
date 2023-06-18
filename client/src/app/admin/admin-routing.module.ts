import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { EditBrandsComponent } from './edit-brands/edit-brands.component';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { EditColorsComponent } from './edit-colors/edit-colors.component';
import { EditFitsComponent } from './edit-fits/edit-fits.component';
import { EditSizesComponent } from './edit-sizes/edit-sizes.component';
import { EditDeliveryMethodsComponent } from './edit-delivery-methods/edit-delivery-methods.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { EditCuponComponent } from './edit-cupon/edit-cupon.component';
import { UpdateNameComponent } from './edit-name/update-name/update-name.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'edit-product/:id', component: EditProductComponent, data: {breadcrumb: {alias: 'productDetails'}}},
  {path: 'add-discount/:id', component: AddDiscountComponent, data: {breadcrumb: {alias: 'addDiscount'}}},
  {path: 'edit-collection', component: EditCollectionComponent, data: {breadcrumb: {alias: 'editCollection'}}},
  {path: 'edit-name', component: EditNameComponent, data: {breadcrumb: {alias: 'editNameProducts'}}},
  {path: 'add-product', component: AddProductComponent, data: {breadcrumb: {alias: 'productDetails'}}},
  {path: 'add-type', component: AddTypeComponent, data: {breadcrumb: {alias: 'typeAdd'}}},
  {path: 'edit-brands', component: EditBrandsComponent, data: {breadcrumb: {alias: 'editBrands'}}},
  {path: 'edit-types', component: EditTypesComponent, data: {breadcrumb: {alias: 'editTypes'}}},
  {path: 'edit-colors', component: EditColorsComponent, data: {breadcrumb: {alias: 'editColors'}}},
  {path: 'edit-fits', component: EditFitsComponent, data: {breadcrumb: {alias: 'editFits'}}},
  {path: 'edit-sizes', component: EditSizesComponent, data: {breadcrumb: {alias: 'editSizes'}}},
  {path: 'edit-cupon', component: EditCuponComponent, data: {breadcrumb: {alias: 'editCupons'}}},
  {path: 'edit-delivery-methods', component: EditDeliveryMethodsComponent, data: {breadcrumb: {alias: 'editDeliveryMethods'}}},
  {path: 'update-name/:id', component: UpdateNameComponent, data: {breadcrumb: {alias: 'editDeliveryMethods'}}},

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
