import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/shared/models/photo';
import { PhotoPicture } from 'src/app/shared/models/photoPicture';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  photos: PhotoPicture[] = [];
  @Input() productId!: number;
  @Input() productPhotos: PhotoPicture[] = [];
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain!: Photo;
  response!:string;
  product: IProduct;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.initializeUploader();
    this.loadProduct();
    }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  loadProduct() {
    this.shopService.getProduct(this.productId).subscribe(product => {
      this.product = product;
    }, error => {
      console.log(error);
    });
  }

  initializeUploader()
  {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photos/'+this.productId  + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 ,
    });
  }

}




