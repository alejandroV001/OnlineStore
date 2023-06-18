import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand';
import { ICollection } from 'src/app/shared/models/collection';
import { IColor } from 'src/app/shared/models/color';
import { IFit } from 'src/app/shared/models/fit';
import { IProduct } from 'src/app/shared/models/product';
import { IType } from 'src/app/shared/models/productType';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ISize } from 'src/app/shared/models/size';
import { ShopService } from '../shop.service';
import { IGender } from 'src/app/shared/models/gender';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';
import { map } from 'rxjs';

@Component({
  selector: 'app-shop-accessories',
  templateUrl: './shop-accessories.component.html',
  styleUrls: ['./shop-accessories.component.scss']
})
export class ShopAccessoriesComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  fits: IFit[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  collections: ICollection[] = [];
  genders: IGender[] = [];

  shopParams!: ShopParams;
  totalCount: number=0;
  form: FormGroup = new FormGroup({});

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'price: High to Low', value: 'priceDesc'}
  ];
  
  constructor(private shopService: ShopService, 
    private fb:FormBuilder, private bcService: BreadcrumbService) {
    this.shopParams = this.shopService.getShopParams();
    this.shopParams.genderId = 0;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.typeId = 0;
    this.shopParams.colorId = 0;
    this.shopParams.fitId = 0;
    this.shopParams.collectionId = 4;
    this.shopParams.pageNumber = 1;
    this.shopParams.sort = "name";
   }

  ngOnInit(): void {
    this.shopParams.genderId = 0;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.typeId = 0;
    this.shopParams.colorId = 0;
    this.shopParams.fitId = 0;
    this.shopParams.collectionId = 4;
    this.shopParams.pageNumber = 1;
    this.shopParams.sort = "name";
    this.shopParams.search = "";
    
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
    this.getColors();
    this.getFits();
    this.getSizes();
    this.getGenders();
    this.bcService.set('@accessories', 'Accessories')
    this.bcService.breadcrumbs$ = this.bcService.breadcrumbs$.pipe(
      map(response => response.filter(crumb => crumb.alias !== 'Shop'))
    );
  

    this.form = this.fb.group({
      gender: [0, [Validators.required]],
      sort: [this.shopParams.sort, [Validators.required]],
      size: [0, [Validators.required]],
      collection: [0, [Validators.required]],
      color: [0, [Validators.required]],
      fit: [0, [Validators.required]],
      type: [0, [Validators.required]],
      brand: [0, [Validators.required]],

    })
  }


  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response!.data;
      this.totalCount = response.count;
      
    }, error => {
      console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types =  [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getSizes()
  {
    this.shopService.getSizes().subscribe(response => {
      this.sizes =  [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getColors()
  {
    this.shopService.getColors().subscribe(response => {
      this.colors =  [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }


  getFits()
  {
    this.shopService.getFits().subscribe(response => {
      this.fits =  [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getGenders() {
    this.shopService.getGenders().subscribe(response => {
      this.genders =  [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(brandId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(typeId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onSizeSelected(sizeId: number) {
    const params = this.shopService.getShopParams();
    params.sizeId = sizeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(sizeId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onColorSelected(colorId: number) {
    const params = this.shopService.getShopParams();
    params.colorId = colorId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(colorId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onFitSelected(fitId: number) {
    const params = this.shopService.getShopParams();
    params.fitId = fitId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(fitId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onGenderSelected(genderId: number) {
    const params = this.shopService.getShopParams();
    params.genderId = genderId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(genderId == 0)
    this.getProducts();
  else  
    this.getProducts(true);
  }


  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    if(sort == "")
    this.getProducts();
  else  
    this.getProducts(true);
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    window.scrollTo(0,0);
    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(false);
    } 
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts(true);
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopParams.genderId = 0;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.collectionId = 4;
    this.shopParams.pageNumber = 1;
    this.shopParams.sort = "name";
    this.shopService.setShopParams(this.shopParams);
    this.form = this.fb.group({
      gender: ["all", [Validators.required]],
       sort: [this.shopParams.sort, [Validators.required]],
      size: [0, [Validators.required]],
      collection: [0, [Validators.required]],
      color: [0, [Validators.required]],
      fit: [0, [Validators.required]],
      type: [0, [Validators.required]],
      brand: [0, [Validators.required]],

    })
    this.getProducts();
  }

}
