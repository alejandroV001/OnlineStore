import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWhishlistItem } from '../../models/whishlist';
import { BasketService } from 'src/app/basket/basket.service';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../models/product';
import { environment } from 'src/environments/environment';
import { IProductAdd } from '../../models/productToAdd';

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
  
  constructor(private basketService: BasketService, private http:HttpClient) { }

  ngOnInit(): void {
  }

  removeWhishlistItem(item: IWhishlistItem){
    this.remove.emit(item);
  }




}
