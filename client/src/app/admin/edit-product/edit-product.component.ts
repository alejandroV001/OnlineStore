import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/shared/models/brand';
import { IColor } from 'src/app/shared/models/color';
import { IFit } from 'src/app/shared/models/fit';
import { IGender } from 'src/app/shared/models/gender';
import { Photo } from 'src/app/shared/models/photo';
import { PhotoPicture } from 'src/app/shared/models/photoPicture';
import { IProduct } from 'src/app/shared/models/product';
import { IType } from 'src/app/shared/models/productType';
import { ISize } from 'src/app/shared/models/size';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain!: Photo;
  response!:string;
  photos: PhotoPicture[] = [];

  productForm:FormGroup;
  sizes: ISize[] = [];
  colors: IColor[] = [];
  fits: IFit[] = [];
  types: IType[] = [];
  brands: IBrand[] = [];
  genders: IGender[]= [];
  errors!: string[];

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, 
    private bcService: BreadcrumbService,private fb: FormBuilder,
    private http:HttpClient, private router: Router, private toastr: ToastrService) {
      this.http.get<IColor>(this.baseUrl +'Color/colors').subscribe((colors: any) => {
        this.colors = colors;
      });
      this.http.get<ISize>(this.baseUrl +'size/sizes').subscribe((sizes: any) => {
        this.sizes = sizes;
      });
      
      this.http.get<IFit>(this.baseUrl +'Fit/fits').subscribe((fits: any) => {
        this.fits = fits;
      });
  
      this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
        this.brands = brands;
      });
      this.http.get<IType>(this.baseUrl +'type/types').subscribe((types: any) => {
        this.types = types;
      });
      this.http.get<IGender>(this.baseUrl +'Gender/gender').subscribe((genders: any) => {
        this.genders = genders;
      });
    }

  ngOnInit(): void {
    this.createAddProductForm();
    this.loadProduct();
  }


  loadProduct() {
    var id = +this.activateRoute.snapshot.paramMap.get('id')!;
    this.shopService.getProduct(id).subscribe(product => {
      console.log(product);
      this.product = product;
      this.photos = product.pictures;
      console.log(this.photos);
      this.bcService.set('@productDetails', product.name)
      if(product)
      {
        this.uploader = new FileUploader({
          url: this.baseUrl + 'photos/'+product.id  + '/photos',
          authToken: 'Bearer ' + localStorage.getItem('token'),
          isHTML5: true,
          allowedFileType: ['image'],
          removeAfterUpload: true,
          autoUpload: false,
          maxFileSize: 10 * 1024 * 1024 
        });
        this.uploader.onSuccessItem = (item, response, status, header) => {
          if (response) {
            const res: PhotoPicture = JSON.parse(response);
            const photo = {
              id: res.id,
              productId: res.productId,
              publicId: res.publicId,
              url: res.url,
              isMain: res.isMain,
            };
            this.photos.push(photo);
          }
        };

        this.productForm.setValue({name: product.name, 
          description: product.description,
          id:product.id
          ,price: product.price, 
          quantity:product.quantity, 
          size:product.productSize  ,productSizeId: this.sizes.find(p => p.name == product.productSize)?.id  
          ,color: product.productColor, productColorId: this.colors.find(p => p.name == product.productColor)!.id 
          ,gender : product.productGender, productGenderId: this.genders.find(p => p.name == product.productGender)!.id,
          fit: product.productFit, productfitId:this.fits.find(p => p.name == product.productFit)!.id,
          type: product.productType, producttypeId: this.types.find(p => p.name == product.productType)!.id,
          brand:product.productBrand, productbrandId: this.brands.find(p => p.name == product.productBrand)!.id});
      }
    }, error => {
      console.log(error);
    });
  }

  createAddProductForm(){
    this.productForm = this.fb.group({
      id:[null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required,Validators.min(0)]],
      quantity: [null, [Validators.required,Validators.min(1)]],
      size: [null, [Validators.required]],
      productSizeId: [null],
      productColorId: [null],
      color: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      productGenderId: [null],
      fit: [null, [Validators.required]],
      productfitId: [null],
      type: [null, [Validators.required]],
      producttypeId: [null],
      brand: [null, [Validators.required]],
      productbrandId: [null],
    });
    
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  selectColor(id: number) {
    this.productForm.controls['productColorId'].setValue(id);
  }
  selectSize(id: number) {
    this.productForm.controls['productSizeId'].setValue(id);
  }
  selectFit(id: number) {
    this.productForm.controls['productfitId'].setValue(id);
  }
  selectType(id: number) {
    this.productForm.controls['producttypeId'].setValue(id);
  }
  selectBrand(id: number) {
    this.productForm.controls['productbrandId'].setValue(id);
  }
  selectGender(id: number) {
    this.productForm.controls['productGenderId'].setValue(id);
  }

  onSubmit(){
    var formVal = this.productForm.value;
    console.log(formVal);

    this.shopService.updateProduct(this.productForm.value).subscribe(response => {
      this.router.navigateByUrl('/admin');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
  }

  deletePhoto(id: number) {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.shopService.deletePhoto(id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
      }, error => {
        this.toastr.error("Photo is main");
      });
    }

}
}
