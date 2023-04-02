import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Emag';

  constructor(private basketService: BasketService, private accountService: AccountService){}

  ngOnInit(): void {
    this.loadBasket();
    this.loadWhishlist();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token!)?.subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    })
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId)
    {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }

  loadWhishlist(){
    const whishlistId = localStorage.getItem('whishlist_id');
    if(whishlistId)
    {
      this.basketService.getWhishlist(whishlistId).subscribe(() => {
        console.log('initialised whishlistId');
      }, error => {
        console.log(error);
      });
    }
  }
}
