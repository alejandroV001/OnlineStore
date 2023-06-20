import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  private orderIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public orderId$: Observable<number> = this.orderIdSubject.asObservable();

  constructor(private http: HttpClient) { 
    const orderId = +localStorage.getItem('orderId')!;
    if (orderId) {
      this.orderIdSubject.next(orderId);
    }
  }

  getOrdersForUser(){
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number){
    return this.http.get(this.baseUrl + 'orders/' + id);
  }

  setOrderId(id:number)
  {
    console.log(id);
    this.orderIdSubject.next(id);
    localStorage.setItem('orderId', id.toString());
  }

  getOrderId()
  {
    return this.orderIdSubject.getValue();
  }
}
