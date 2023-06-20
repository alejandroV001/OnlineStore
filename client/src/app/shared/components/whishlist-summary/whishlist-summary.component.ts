import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWhishlistItem } from '../../models/whishlist';
import { BasketService } from 'src/app/basket/basket.service';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../models/product';
import { environment } from 'src/environments/environment';
import { IProductAdd } from '../../models/productToAdd';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-whishlist-summary',
  templateUrl: './whishlist-summary.component.html',
  styleUrls: ['./whishlist-summary.component.scss']
})
export class WhishlistSummaryComponent implements OnInit {
  @Output() remove: EventEmitter<IWhishlistItem> = new EventEmitter<IWhishlistItem>();
  @Input() items!: any[] ;
  product: IProduct;
  baseUrl = environment.apiUrl;
  
  constructor(private basketService: BasketService, private http:HttpClient,
    private router: Router,private shopService: ShopService) { }

  ngOnInit(): void {
  }

  removeWhishlistItem(item: IWhishlistItem){
    this.remove.emit(item);
  }

  goTo(name: string,id: number)
  {
    const replacedName = name.replace(/\s+/g, '-');
    this.shopService.setProductId(id);
    this.router.navigateByUrl(`/shop/${replacedName}`);
  }



}
