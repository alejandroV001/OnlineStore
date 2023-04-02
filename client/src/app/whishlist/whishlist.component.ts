import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { IWhishlist, IWhishlistItem } from '../shared/models/whishlist';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {

  whishlist$!: Observable<IWhishlist>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.whishlist$ = this.basketService.whishlist$;
  }

    removeWhishlistItem(item: IWhishlistItem){
    this.basketService.removeItemFromWhishlist(item);
  }

}
