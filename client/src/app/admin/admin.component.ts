import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';
import { IFit } from '../shared/models/fit';
import { IColor } from '../shared/models/color';
import { ISize } from '../shared/models/size';
import { ICollection } from '../shared/models/collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGender } from '../shared/models/gender';
import { BreadcrumbService } from 'xng-breadcrumb';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  fits: IFit[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  collections: ICollection[] = [];
  genders: IGender[] = [];
  totalCount: number=0;
  shopParams!: ShopParams;
  form: FormGroup = new FormGroup({});

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to Hight', value: 'priceAsc'},
    {name: 'price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService, private router: Router,
    private fb:FormBuilder,private bcService: BreadcrumbService) { 
    this.shopParams = this.shopService.getShopParams();
    this.shopParams.brandId = 0;
    this.shopParams.sizeId = 0;
    this.shopParams.collectionId = 0;

    this.shopParams.sort = "name";
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    this.getColors();
    this.getFits();
    this.getSizes();
    this.getGenders();
    this.getCollections();

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

      this.totalCount = response!.count ;
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

  getGenders() {
    this.shopService.getGenders().subscribe(response => {
      this.genders =  [{id: 0, name: 'All'}, ...response];
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

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
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


  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSizeSelected(sizeId: number) {
    const params = this.shopService.getShopParams();
    params.sizeId = sizeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onColorSelected(colorId: number) {
    const params = this.shopService.getShopParams();
    params.colorId = colorId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onFitSelected(fitId: number) {
    const params = this.shopService.getShopParams();
    params.fitId = fitId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onCollectionSelected(collectionId: number) {
    const params = this.shopService.getShopParams();
    params.collectionId = collectionId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onGenderSelected(genderId: number) {
    const params = this.shopService.getShopParams();
    params.genderId = genderId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();

    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(false);
    } 
  }

  deleteProduct(id: number){
    if (confirm('Are you sure you want to delete this product?')) {
    this.shopService.deleteProduct(id).subscribe(() => {
      this.router.navigateByUrl('/admin');
    }, error => {
      console.log(error);
    });
  }
  }

  openEditTab(name:string,id: number) {
    const replacedName = name.replace(/\s+/g, '-');
    this.shopService.setProductId(id);
    const url = `/admin/edit-product/${replacedName.toLowerCase()}`;

    const newTab = window.open(url, '_blank')?.blur();
  }

  addDiscount(name:string,id:number)
  {
    const replacedName = name.replace(/\s+/g, '-');
    this.shopService.setProductId(id);
    this.router.navigateByUrl(`/admin/add-discount/${replacedName.toLowerCase()}`);
  }


}
