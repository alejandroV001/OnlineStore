import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminComponent } from './admin.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { ToastrModule } from 'ngx-toastr';
import { EditSizesComponent } from './edit-sizes/edit-sizes.component';
import { EditTypesComponent } from './edit-types/edit-types.component';
import { EditBrandsComponent } from './edit-brands/edit-brands.component';
import { EditDeliveryMethodsComponent } from './edit-delivery-methods/edit-delivery-methods.component';
import { EditColorsComponent } from './edit-colors/edit-colors.component';
import { EditFitsComponent } from './edit-fits/edit-fits.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { MaterialModule } from '../material.module';
import { EditCuponComponent } from './edit-cupon/edit-cupon.component';
import { UpdateNameComponent } from './edit-name/update-name/update-name.component';
import { UpdateSizesComponent } from './edit-sizes/update-sizes/update-sizes.component';
import { UpdateTypeComponent } from './edit-types/update-type/update-type.component';
import { UpdateFitComponent } from './edit-fits/update-fit/update-fit.component';
import { UpdateColorComponent } from './edit-colors/update-color/update-color.component';
import { UpdateColectionComponent } from './edit-collection/update-colection/update-colection.component';
import { UpdateCuponComponent } from './edit-cupon/update-cupon/update-cupon.component';
import { UpdateDeliveryComponent } from './edit-delivery-methods/update-delivery/update-delivery.component';
import { UpdateBrandComponent } from './edit-brands/update-brand/update-brand.component';
import { UpdateDiscountComponent } from './add-discount/update-discount/update-discount.component';



@NgModule({
  declarations: [
  AdminComponent,
  AddProductComponent,
  EditProductComponent,
  AddTypeComponent,
  EditSizesComponent,
  EditTypesComponent,
  EditBrandsComponent,
  EditDeliveryMethodsComponent,
  EditColorsComponent,
  EditFitsComponent,
  AddDiscountComponent,
  EditCollectionComponent,
  EditNameComponent,
  EditCuponComponent,
  UpdateNameComponent,
  UpdateSizesComponent,
  UpdateTypeComponent,
  UpdateFitComponent,
  UpdateColorComponent,
  UpdateColectionComponent,
  UpdateCuponComponent,
  UpdateDeliveryComponent,
  UpdateBrandComponent,
  UpdateDiscountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ToastrModule,
    FileUploadModule,
    MaterialModule
    ]
})
export class AdminModule { }
