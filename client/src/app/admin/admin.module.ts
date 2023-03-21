import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AddProductComponent } from './add-product/add-product.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
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



@NgModule({
  declarations: [
  AdminComponent,
  AddProductComponent,
  EditProductComponent,
  PhotoEditorComponent,
  AddTypeComponent,
  EditSizesComponent,
  EditTypesComponent,
  EditBrandsComponent,
  EditDeliveryMethodsComponent,
  EditColorsComponent,
  EditFitsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ToastrModule,
    FileUploadModule
    ]
})
export class AdminModule { }
