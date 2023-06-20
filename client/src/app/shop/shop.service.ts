import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mapTo, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { ICollection } from '../shared/models/collection';
import { IColor } from '../shared/models/color';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IDiscount } from '../shared/models/discount';
import { IFit } from '../shared/models/fit';
import { IName } from '../shared/models/name';
import { IPagination, Pagination } from '../shared/models/pagination';
import { PhotoPicture } from '../shared/models/photoPicture';
import { IProduct } from '../shared/models/product';
import { IProductAdd } from '../shared/models/productToAdd';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ISize } from '../shared/models/size';
import { IGender } from '../shared/models/gender';
import { ICupon } from '../shared/models/cupon';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  fits: IFit[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  genders: IGender[] = [];
  collections: ICollection[] = [];
  names: IName[] = [];
  photos: PhotoPicture[] = [];
  cupons: ICupon[] = [];
  productId: number;

  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();
  productCacheTotal = new Map();


  constructor(private http:HttpClient) { }

  getProducts(useCache: boolean) {
    if(useCache === false){
      this.productCache = new Map();
      this.productCacheTotal = new Map();
    }

    if(this.productCache.size > 0 && useCache === true){
      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
        var total = this.productCacheTotal.get(Object.values(this.shopParams).join('-'));
        this.pagination.count = total;
        console.log("cache");
        return of(this.pagination);}}

    let params = new HttpParams();
    if(this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }
    if(this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if(this.shopParams.genderId !== 0) {
      params = params.append('genderId', this.shopParams.genderId.toString());
    }
    if(this.shopParams.fitId !== 0) {
      params = params.append('fitId', this.shopParams.fitId.toString());
    }
    if(this.shopParams.colorId !== 0) {
      params = params.append('colorId', this.shopParams.colorId.toString());
    }
    if(this.shopParams.sizeId !== 0) {
      params = params.append('sizeId', this.shopParams.sizeId.toString());
    }
    if(this.shopParams.collectionId !== 0) {
      params = params.append('collectionId', this.shopParams.collectionId.toString());
    }
    if(this.shopParams.genderId !== 0) {
      params = params.append('genderId', this.shopParams.genderId.toString());
    }
    if(this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response.body!.data);
          this.productCacheTotal.set(Object.values(this.shopParams).join('-'), response.body?.count);
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
    let product!: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find(p => p.id === id)!;
    })

    if(product)
    {
      return of(product);
    }

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

  getSizes(){
    if(this.sizes.length > 0){
      return of(this.sizes);
    }
    return this.http.get<ISize[]>(this.baseUrl + 'Size/sizes').pipe(
      map(response => {
        this.sizes = response;
        return response;
      })
    )
  }

  getGenders(){
    if(this.genders.length > 0){
      return of(this.genders);
    }
    return this.http.get<IGender[]>(this.baseUrl + 'Gender/gender').pipe(
      map(response => {
        this.genders = response;
        return response;
      })
    )
  }


  getColors(){
    if(this.colors.length > 0){
      return of(this.colors);
    }
    return this.http.get<IColor[]>(this.baseUrl + 'Color/colors').pipe(
      map(response => {
        this.colors = response;
        return response;
      })
    )
  }

  getFits(){
    if(this.fits.length > 0){
      return of(this.fits);
    }
    return this.http.get<IFit[]>(this.baseUrl + 'Fit/fits').pipe(
      map(response => {
        this.fits = response;
        return response;
      })
    )
  }

  getCollections(){
    if(this.collections.length > 0){
      return of(this.collections);
    }
    return this.http.get<ICollection[]>(this.baseUrl + 'Collection/collections').pipe(
      map(response => {
        this.collections = response;
        return response;
      })
    )
  }

  addProduct(values: any) {
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

  updateSize(values: any)
  {
    return this.http.put<ISize>(this.baseUrl + 'Size/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateType(values: any)
  {
    return this.http.put<IType>(this.baseUrl + 'type/update', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCupon(id: number) {
    return this.http.delete(this.baseUrl + 'Cupon/'+ id);
  }

  addCupon(values: any) {
    return this.http.post<ICupon>(this.baseUrl + 'Cupon', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateCupon(values: any)
  {
    return this.http.put<ICupon>(this.baseUrl + 'Cupon/update', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCupons()
  {
    if(this.cupons.length > 0){
      return of(this.cupons);
    }
    return this.http.get<ICupon[]>(this.baseUrl +'Cupon/getCupons').pipe(
      map(response => {
        this.cupons = response;
        return response;
      })
    );
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

  updateBrand(values: any)
  {
    return this.http.put<IBrand>(this.baseUrl + 'Brand/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateColor(values: any)
  {
    return this.http.put<IColor>(this.baseUrl + 'color/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateFit(values: any)
  {
    return this.http.put<IFit>(this.baseUrl + 'fit/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateDeliveryMethods(values: any)
  {
    return this.http.put<IDeliveryMethod>(this.baseUrl + 'DeliveryMethod/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateCollection(values: any)
  {
    return this.http.put<ICollection>(this.baseUrl + 'collection/update', values).pipe(
      map(response => {
        return response;
      })
    );
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

  updateName(values: any)
  {
    return this.http.put<IName>(this.baseUrl + 'Name/update', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  getNames(){
    if(this.names.length > 0){
      return of(this.names);
    }
    return this.http.get<IName[]>(this.baseUrl + 'Name/names').pipe(
      map(response => {
        this.names = response;
        return response;
      })
    )
  }

  deleteProductDiscount(id: number)
  {
    return this.http.delete(this.baseUrl + 'Discount/'+ id);
  }
  deletePhoto(id: number) {
    return this.http.delete(this.baseUrl + 'photos/'+ 1 +'/photos/' + id);
  }

  setPhotoMain(id: number, idMain: number) {
    const body = { Id:id, IdMain:idMain };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(this.baseUrl + 'photos/setmain', body,  { headers });
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

  addDiscountForProduct(values:any)
  {
    return this.http.post<IDiscount>(this.baseUrl + 'Discount', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateDiscount(values: any)
  {
    return this.http.put<IDiscount>(this.baseUrl + 'Discount/update', values).pipe(
      map(response => {
        return response;
      })
    );
  }

  checkDiscountProduct(id: number)
  {
    return this.http.get<IDiscount[]>(this.baseUrl + 'Discount/'+ id).pipe(
      map(response => {
        return response;
      })
    )
  }

  setProductId(id: number)
  {
    this.productId = id;
    localStorage.setItem('productId', id.toString());
  }

  getProductId()
  {
    return this.productId;
  }

}

