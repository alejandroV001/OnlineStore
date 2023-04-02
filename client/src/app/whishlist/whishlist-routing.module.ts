import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WhishlistComponent } from './whishlist.component';

const routes: Routes = [
  {path: '', component: WhishlistComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WhishlistRoutingModule { }
