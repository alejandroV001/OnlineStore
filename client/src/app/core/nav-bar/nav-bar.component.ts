import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  count: number;

  constructor(private basketeService: BasketService, private accountService: AccountService, private router: Router) {
    this.accountService.role$.pipe(take(1)).subscribe(role => {
      this.role = role!;
    })
   }

  ngOnInit(): void {
    this.basket$ = this.basketeService.basket$;
    this.whishlist$ = this.basketeService.whishlist$;

    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.role$.subscribe(role => {
      this.role = role;
    })

    this.basket$.forEach(element => {
      var basketElements = element?.items!;
      var aux = 0;
      basketElements?.forEach(item => {
        aux = aux + item.quantity;
      })
      this.count = aux;
    });
  }

  logout(){
    this.accountService.logout();
  }

  goToMen()
  {
    this.router.navigateByUrl('/shop/men');
  }

}
