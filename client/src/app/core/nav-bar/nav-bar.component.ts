import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket>;
  currentUser$!: Observable<IUser>;
  role!: string;

  constructor(private basketeService: BasketService, private accountService: AccountService) {
    this.accountService.role$.pipe(take(1)).subscribe(role => {
      this.role = role!;
    })
   }

  ngOnInit(): void {
    this.basket$ = this.basketeService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.role$.subscribe(role => {
      this.role = role;
    })
  }

  logout(){
    this.accountService.logout();
  }

}
