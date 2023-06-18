import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IFit } from 'src/app/shared/models/fit';
import { IColor } from 'src/app/shared/models/color';
import { ISize } from 'src/app/shared/models/size';
import { ICollection } from 'src/app/shared/models/collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'xng-breadcrumb';
import { map } from 'rxjs';

@Component({
  selector: 'app-shop-woman',
  templateUrl: './shop-woman.component.html',
  styleUrls: ['./shop-woman.component.scss']
})
export class ShopWomanComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  fits: IFit[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  collections: ICollection[] = [];
  shopParams!: ShopParams;
  totalCount: number=0;
  form: FormGroup = new FormGroup({});

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'price: High to Low', value: 'priceDesc'}
  ];
  
  constructor(private shopService: ShopService, private fb: FormBuilder,private bcService: BreadcrumbService) { 
    this.shopParams = this.shopService.getShopParams();
    this.shopParams.genderId = 2;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.collectionId = 0;
    this.shopParams.typeId = 0;
    this.shopParams.colorId = 0;
    this.shopParams.fitId = 0;
    this.shopParams.pageNumber = 1;

    this.shopParams.sort = "name";
  }

  ngOnInit(): void {
    this.shopParams = this.shopService.getShopParams();
    this.shopParams.genderId = 2;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.collectionId = 0;
    this.shopParams.typeId = 0;
    this.shopParams.colorId = 0;
    this.shopParams.fitId = 0;
    this.shopParams.pageNumber = 1;
    this.shopParams.search = "";

    this.shopParams.sort = "name";
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
    this.getColors();
    this.getFits();
    this.getSizes();
    this.getCollections();
    this.bcService.set('@shopWoman', 'Woman')
    this.bcService.breadcrumbs$ = this.bcService.breadcrumbs$.pipe(
      map(response => response.filter(crumb => crumb.alias !== 'Shop'))
    );
    
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
  }

  getProducts(useCache = false) {
    useCache = false;

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

  getCollections()
  {
    this.shopService.getCollections().subscribe(response => {
      this.collections =  [{id: 0, name: 'All'}, ...response];
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

  onCollectionSelected(collectionId: number) {
    const params = this.shopService.getShopParams();
    params.collectionId = collectionId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    if(collectionId == 0)
      this.getProducts();
    else  
      this.getProducts(true);
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts(true);
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    window.scrollTo(0,0);
    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
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
    this.shopParams.genderId = 2;
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.collectionId = 0;
    this.shopParams.pageNumber = 1;
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
    this.getProducts(true);
  }
}
