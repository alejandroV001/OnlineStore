import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brand';
import { ICollection } from 'src/app/shared/models/collection';
import { IColor } from 'src/app/shared/models/color';
import { IFit } from 'src/app/shared/models/fit';
import { IGender } from 'src/app/shared/models/gender';
import { IName } from 'src/app/shared/models/name';
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
  names : IName[] = [];
  collections : ICollection[]= [];

  errors!: string[];

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Subject<File[]> = new Subject();
  fileInfos$: Observable<File[]> = this.fileInfos!.asObservable();
  files: File[] = [];

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, 
    private bcService: BreadcrumbService,private fb: FormBuilder,
    private http:HttpClient, private router: Router, private toastr: ToastrService) {
      
    }

  ngOnInit(): void {

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
    this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
      this.names = names;
    });
    this.http.get<ICollection>(this.baseUrl +'Collection/collections').subscribe((collections: any) => {
      this.collections = collections;
    });

    this.createAddProductForm();
    this.loadProduct();
  }


  loadProduct() {
    var id = +localStorage.getItem('productId')!;
    this.shopService.getProduct(id).subscribe(product => {
      this.product = product;
      this.photos = product.pictures;
      this.bcService.set('@productDetails', product.productName)
      if(product)
      {
        this.productForm.setValue({ 
          description: product.description,
          id:product.id,
          price: product.price, 
          quantity:product.quantity,
          name:(product.productName) ? product.productName : null, productNameId: (product.productName) ? this.names.find(p => p.name == product.productName)?.id : 0  ,
          size:(product.productSize) ? product.productSize : null  ,productSizeId: (product.productSize) ? this.sizes.find(p => p.name == product.productSize)?.id : 0  ,
          color: (product.productColor) ? product.productColor : null, productColorId:(product.productColor) ? this.colors.find(p => p.name == product.productColor)?.id : 0, 
          gender : (product.productGender) ? product.productGender : null, productGenderId: (product.productGender) ? this.genders.find(p => p.name == product.productGender)?.id : 0,
          fit: (product.productFit) ? product.productFit : null, productfitId: (product.productFit) ? this.fits.find(p => p.name == product.productFit)?.id : 0,
          type: (product.productType) ? product.productType : null, producttypeId: (product.productType) ? this.types.find(p => p.name == product.productType)?.id : 0,
          brand:(product.productBrand) ? product.productBrand : null, productbrandId: (product.productBrand) ? this.brands.find(p => p.name == product.productBrand)?.id : 0,
          collection:(product.productCollection) ? product.productCollection : null, collectionId: (product.productCollection) ? this.collections.find(p => p.name == product.productCollection)?.id : 0
        });
      }

    window.scrollTo(0,0);

    }, error => {
      console.log(error);
    });
  }

  createAddProductForm(){
    this.productForm = this.fb.group({
      id:[null],
      name: [null, Validators.required],
      productNameId: [0,[Validators.required]],
      description: [null, Validators.required],
      price: [null, [Validators.required,Validators.min(0)]],
      quantity: [null, [Validators.required,Validators.min(1)]],
      size: [null, [Validators.required]],
      productSizeId: [0,[Validators.required]],
      productColorId: [0,[Validators.required]],
      color: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      productGenderId: [0,[Validators.required]],
      fit: [null, [Validators.required]],
      productfitId: [0,[Validators.required]],
      type: [null, [Validators.required]],
      producttypeId: [0,[Validators.required]],
      brand: [null, [Validators.required]],
      productbrandId: [0,[Validators.required]],
      collection: [null, [Validators.required]],
      collectionId: [0, [Validators.required]]
    });
    
  }

  initialiseFormValues(product: IProduct)
  {
    this.productForm.setValue({ 
      description: product.description,
      id:product.id,
      price: product.price, 
      quantity:product.quantity,
      name:(product.productName) ? product.productName : null, productNameId: (product.productName) ? this.names.find(p => p.name == product.productName)!.id : 0  ,
      size:(product.productSize) ? product.productSize : null  ,productSizeId: (product.productSize) ? this.sizes.find(p => p.name == product.productSize)!.id : 0  ,
      color: (product.productColor) ? product.productColor : null, productColorId:(product.productColor) ? this.colors.find(p => p.name == product.productColor)!.id : 0, 
      gender : (product.productGender) ? product.productGender : null, productGenderId: (product.productGender) ? this.genders.find(p => p.name == product.productGender)!.id : 0,
      fit: (product.productFit) ? product.productFit : null, productfitId: (product.productFit) ? this.fits.find(p => p.name == product.productFit)!.id : 0,
      type: (product.productType) ? product.productType : null, producttypeId: (product.productType) ? this.types.find(p => p.name == product.productType)!.id : 0,
      brand:(product.productBrand) ? product.productBrand : null, productbrandId: (product.productBrand) ? this.brands.find(p => p.name == product.productBrand)!.id : 0,
      collection:(product.productCollection) ? product.productCollection : null, collectionId: (product.productCollection) ? this.collections.find(p => p.name == product.productCollection)!.id : 0
    });
  }

  selectColor(name: any) {
    if(name === "")
    {
      this.productForm.controls['productColorId'].setValue(0);
    }else
    {
      var id = this.colors.find(p => p.name == name)!.id;
      this.productForm.controls['productColorId'].setValue(id);
    }
  }
  selectSize(name: any) {
    if(name === "")
    {
      this.productForm.controls['productSizeId'].setValue(0);
    }else
    {
      var id = this.sizes.find(p => p.name == name)!.id;
      this.productForm.controls['productSizeId'].setValue(id);
    }
  }
  selectFit(name: any) {
    if(name === "")
    {
      this.productForm.controls['productfitId'].setValue(0);
    }else
    {
      var id = this.fits.find(p => p.name == name)!.id;
      this.productForm.controls['productfitId'].setValue(id);
    }
  }
  selectType(name: any) {
    if(name === "")
    {
      this.productForm.controls['producttypeId'].setValue(0);
    }else
    {
      var id = this.types.find(p => p.name == name)!.id;
      this.productForm.controls['producttypeId'].setValue(id);
    }
  }
  selectBrand(name: any) {
    if(name === "")
    {
      this.productForm.controls['productbrandId'].setValue(0);
    }else
    {
      var id = this.brands.find(p => p.name == name)!.id;
      this.productForm.controls['productbrandId'].setValue(id);
    }
  }
  selectGender(name: any) {
    if(name === "")
    {
      this.productForm.controls['productGenderId'].setValue(0);
    }else
    {
      var id = this.genders.find(p => p.name == name)!.id;
      this.productForm.controls['productGenderId'].setValue(id);
    }
  }
  selectName(name: any) {
    if(name === "")
    {
      this.productForm.controls['productNameId'].setValue(0);
    }else
    {
      var id = this.names.find(p => p.name == name)!.id;
      this.productForm.controls['productNameId'].setValue(id);
    }
  }
  selectCollection(name: any) {
    if(name === "")
    {
      this.productForm.controls['collectionId'].setValue(0);
    }else
    {
      var id = this.collections.find(p => p.name == name)!.id;
      this.productForm.controls['collectionId'].setValue(id);
    }
    
  }

  onSubmit(){
    this.shopService.updateProduct(this.productForm.value).subscribe(response => {
      window.location.reload();
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

selectFiles(event: any): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;

  this.files = [];
  for (let i = 0; i < this.selectedFiles!.length; i++) {
    this.files.push(this.selectedFiles!.item(i)!);
  }

  this.fileInfos!.next(this.files);

}

upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  if (file) {
    this.shopService.upload(file, this.product!.id).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          window.location.reload();
        }
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
      }
    });
  }
}

uploadFiles(): void {
  this.message = [];

  if (this.selectedFiles) {
    for (let i = 0; i < this.files.length; i++) {
      this.upload(i, this.files[i]);
    }
  }
}

removeFile(index: number): void {
  this.files.splice(index, 1);

  this.fileInfos?.next(this.files);
}

setMain(id: number) {
  var idMain = 0;

  this.photos.forEach(element => {
    if(element.isMain == true)
      idMain = element.id;
  });

  if (confirm('Are you sure you want to make this photo main?')) {
    this.shopService.setPhotoMain(id , idMain).subscribe(() => {
      window.location.reload();
    }, error => {
      this.toastr.error("Photo is main");
    });
  }    
}
}
