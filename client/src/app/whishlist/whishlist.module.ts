import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhishlistComponent } from './whishlist.component';
import { SharedModule } from '../shared/shared.module';
import { WhishlistRoutingModule } from './whishlist-routing.module';



@NgModule({
  declarations: [
    WhishlistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WhishlistRoutingModule
  ]
})
export class WhishlistModule { }
