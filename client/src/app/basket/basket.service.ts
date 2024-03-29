import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';
import { IWhishlist, IWhishlistItem, Whishlist } from '../shared/models/whishlist';
import { IDiscount } from '../shared/models/discount';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null!);
  basket$ = this.basketSource.asObservable();
  private whislistSource = new BehaviorSubject<IWhishlist>(null!);
  whishlist$ = this.whislistSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null!);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;
  discount = 0;

  constructor(private http: HttpClient) { }


  createPaymentIntent(){
    return this.http.post<IBasket>(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
        })
      )
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  setDiscountValue(discount: number)
  {
    this.discount = discount;
    console.log(discount);
    const basket = this.getCurrentBasketValue();
    basket.discount = (discount) ? discount : 0;
    this.calculateTotals();
    this.setBasket(basket);
  }


  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.shipping = basket.shippingPrice!;
          this.calculateTotals();
        })
      );
  }

  getWhishlist(id: string) {
    return this.http.get<IWhishlist>(this.baseUrl + 'Whishlist?id=' + id)
      .pipe(
        map((whishlist: IWhishlist) => {
          this.whislistSource.next(whishlist);
        })
      );
  }


  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    })
  }


  setWhishlist(whishlist: IWhishlist) {
    return this.http.post<IWhishlist>(this.baseUrl + 'Whishlist', whishlist).subscribe((response: IWhishlist) => {
      this.whislistSource.next(response);
    }, error => {
      console.log(error);
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  getCurrentWhishlistValue() {
    return this.whislistSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);

    this.setBasket(basket);
  }

  addItemToWhishlist(item: IProduct) {
    const itemToAdd: IWhishlistItem = this.mapProductItemToWhishlistItem(item);
    const whishlist = this.getCurrentWhishlistValue() ?? this.createWhishlist();
    whishlist.items = this.addOrUpdateItemWhishlist(whishlist.items, itemToAdd);
    console.log(whishlist.items);
    this.setWhishlist(whishlist);
  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
  }

   removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);
      if(basket.items.length > 0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }

  removeItemFromWhishlist(item: IWhishlistItem) {
    const whishlist = this.getCurrentWhishlistValue();
    if (whishlist.items.some(x => x.id === item.id)){
      whishlist.items = whishlist.items.filter(i => i.id !== item.id);
      if(whishlist.items.length > 0){
        this.setWhishlist(whishlist);
      }else{
        this.deleteWhishlist(whishlist);
      }
    }
  }

  deleteLocalBasket(id: string){
    this.basketSource.next(null!);
    this.basketTotalSource.next(null!);
    localStorage.removeItem('basket_id');
  }

  deleteLocalWhishlist(id: string){
    this.whislistSource.next(null!);
    localStorage.removeItem('whishlist_id');
  }

   deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null!);
      this.basketTotalSource.next(null!);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    })
  }

  deleteWhishlist(whishlist: IWhishlist) {
    return this.http.delete(this.baseUrl + 'Whishlist?id=' + whishlist.id).subscribe(() => {
      this.whislistSource.next(null!);
      localStorage.removeItem('whishlist_id');
    }, error => {
      console.log(error);
    })
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    console.log(basket);
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => ((b.discountedPrice ? b.discountedPrice : b.price) * b.quantity) + a, 0) - basket.discount!;
    const total = subtotal + shipping;
    const discount = (basket.discount) ? basket.discount : 0;

    this.basketTotalSource.next({shipping, total, subtotal,discount});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    const discountForProduct = itemToAdd.discountedPrice;

    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else if(index !== -1 && discountForProduct != null)
    {
      itemToAdd.quantity = items[index].quantity + itemToAdd.quantity;
      items = items.filter(i => i.id !== itemToAdd.id);
      items.push(itemToAdd);
    }
    else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private addOrUpdateItemWhishlist(items: IWhishlistItem[], itemToAdd: IWhishlistItem): IWhishlistItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      items.push(itemToAdd);
    }
    return items;
  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private createWhishlist(): IWhishlist {
    const whishlist = new Whishlist();
    localStorage.setItem('whishlist_id', whishlist.id);
    return whishlist;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      name: item.productName,
      price: item.price,
      discountedPrice: item.priceDiscounted,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
      size: item.productSize,
      color: item.productColor
    };
  }

  private mapProductItemToWhishlistItem(item: IProduct): IWhishlistItem {
    return {
      id: item.id,
      name: item.productName,
      price: item.price,
      discountedPrice: item.priceDiscounted,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }


}
