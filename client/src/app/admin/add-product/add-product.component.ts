import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBrand } from 'src/app/shared/models/brand';
import { IColor } from 'src/app/shared/models/color';
import { IFit } from 'src/app/shared/models/fit';
import { Photo } from 'src/app/shared/models/photo';
import { IType } from 'src/app/shared/models/productType';
import { ISize } from 'src/app/shared/models/size';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  baseUrl = environment.apiUrl;

  productForm!:FormGroup;
  errors!: string[];
  images: Photo[] = [];
  image: string[] = [];

  sizes: ISize[] = [];
  colors: IColor[] = [];
  fits: IFit[] = [];
  types: IType[] = [];
  brands: IBrand[] = [];

  constructor(private fb: FormBuilder, private shopService: ShopService,
      private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.createAddProductForm();

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
  }

  createAddProductForm(){
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required,Validators.min(0)]],
      quantity: [null, [Validators.required,Validators.min(1)]],
      size: [null, [Validators.required]],
      productSizeId: [null, [Validators.required]],
      productColorId: [null, [Validators.required]],
      color: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      productGenderId: [null, [Validators.required]],
      fit: [null, [Validators.required]],
      productfitId: [null, [Validators.required]],
      type: [null, [Validators.required]],
      producttypeId: [null, [Validators.required]],

      brand: [null, [Validators.required]],
      productbrandId: [null, [Validators.required]],

    });
  }


  
  onSubmit(){
    var formVal = this.productForm.value;
    console.log(formVal);

    this.shopService.addProduct(this.productForm.value).subscribe(response => {
      this.router.navigateByUrl('/admin');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
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
}
