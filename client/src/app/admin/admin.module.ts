import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AddProductComponent } from './add-product/add-product.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [
  AdminComponent,
  AddProductComponent,
  EditProductComponent,
  PhotoEditorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FileUploadModule
    ]
})
export class AdminModule { }
