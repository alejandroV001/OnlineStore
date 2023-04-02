import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { IWhishlist } from 'src/app/shared/models/whishlist';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  whishlist$!: Observable<IWhishlist>;
  currentUser$!: Observable<IUser>;
  role!: string;

  constructor(private basketeService: BasketService, private accountService: AccountService) {
    this.accountService.role$.pipe(take(1)).subscribe(role => {
      this.role = role!;
    })
   }

  ngOnInit(): void {
    this.basket$ = this.basketeService.basket$;
    this.whishlist$ = this.basketeService.whishlist$;
    console.log(this.whishlist$);
    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.role$.subscribe(role => {
      this.role = role;
    })
  }

  logout(){
    this.accountService.logout();
  }

}
