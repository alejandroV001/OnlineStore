import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mapTo, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { ICollection } from '../shared/models/collection';
import { IColor } from '../shared/models/color';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IFit } from '../shared/models/fit';
import { IName } from '../shared/models/name';
import { IPagination, Pagination } from '../shared/models/pagination';
import { PhotoPicture } from '../shared/models/photoPicture';
import { IProduct } from '../shared/models/product';
import { IProductAdd } from '../shared/models/productToAdd';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ISize } from '../shared/models/size';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  photos: PhotoPicture[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http:HttpClient) { }


  getProducts(useCache: boolean) {
    if(useCache === false){
      this.productCache = new Map();
    }

    if(this.productCache.size > 0 && useCache === true){
      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagination);
      }
    }
    let params = new HttpParams();

    if(this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }
    if(this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if(this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString())

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response.body!.data);
          this.pagination = response.body!;
          return this.pagination;
        })
      );
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getShopParams()
  {
    return this.shopParams;
  }

  getProduct(id: number) {
    // let product!: IProduct;

    // this.productCache.forEach((products: IProduct[]) => {
    //   product = products.find(p => p.id=== id)!;
    // })

    // if(product)
    // {
    //   return of(product);
    // }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getPhotosForProduct(id: number) {
    return this.http.get<PhotoPicture[]>(this.baseUrl + 'photos/' + id);
  }
  getBrands(){
    if(this.brands.length > 0){
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    )
  }

  getTypes(){
    if(this.types.length > 0){
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    )
  }

  addProduct(values: any) {
    console.log(values);
    return this.http.post<IProductAdd>(this.baseUrl + 'Products/add-product', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/'+ id);
  }

  updateProduct(values:any) {
    return this.http.put<IProductAdd>(this.baseUrl + 'Products/update-product',values).pipe(
      map(response => {
        return response;
      })
    );
  }

  addSize(values: any) {
    return this.http.post<ISize>(this.baseUrl + 'Size', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteSize(id: number) {
    return this.http.delete(this.baseUrl + 'size/'+ id);
  }

  addType(values: any) {
    return this.http.post<ISize>(this.baseUrl + 'Type', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteType(id: number) {
    return this.http.delete(this.baseUrl + 'type/'+ id);
  }

  addBrand(values: any) {
    return this.http.post<IBrand>(this.baseUrl + 'Brand', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteBrand(id: number) {
    return this.http.delete(this.baseUrl + 'brand/'+ id);
  }

  addColors(values: any) {
    return this.http.post<IColor>(this.baseUrl + 'Color', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteColors(id: number) {
    return this.http.delete(this.baseUrl + 'color/'+ id);
  }

  addFits(values: any) {
    return this.http.post<IFit>(this.baseUrl + 'Fit', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteFits(id: number) {
    return this.http.delete(this.baseUrl + 'fit/'+ id);
  }

  addDeliveryMethods(values: any) {
    return this.http.post<IDeliveryMethod>(this.baseUrl + 'DeliveryMethod', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteDeliveryMethods(id: number) {
    return this.http.delete(this.baseUrl + 'deliverymethod/'+ id);
  }

  addCollection(values: any) {
    return this.http.post<ICollection>(this.baseUrl + 'Collection', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCollection(id: number) {
    return this.http.delete(this.baseUrl + 'collection/'+ id);
  }

  addName(values: any) {
    return this.http.post<IName>(this.baseUrl + 'Name', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteName(id: number) {
    return this.http.delete(this.baseUrl + 'Name/'+ id);
  }

  deletePhoto(id: number) {
    return this.http.delete(this.baseUrl + 'photos/'+ 1 +'/photos/' + id);
  }

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}photos/`+id+`/photos`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}

