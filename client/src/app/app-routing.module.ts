import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { FAQComponent } from './core/footer/faq/faq.component';
import { AboutComponent } from './core/footer/about/about.component';
import { PricingComponent } from './core/footer/pricing/pricing.component';
import { FeaturesComponent } from './core/footer/features/features.component';
import { ReturnsPolicyComponent } from './core/footer/returns-policy/returns-policy.component';
import { DeliveryInfoComponent } from './core/footer/delivery-info/delivery-info.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
  {path: 'faq', component: FAQComponent, data: {breadcrumb: 'FAQ'}},
  {path: 'delivery-info', component: DeliveryInfoComponent, data: {breadcrumb: 'Delivery Information'}},
  {path: 'returns-policy', component: ReturnsPolicyComponent, data: {breadcrumb: 'Returns Policy'}},
  {path: 'features', component: FeaturesComponent, data: {breadcrumb: 'Features'}},
  {path: 'pricing', component: PricingComponent, data: {breadcrumb: 'Pricing'}},
  {path: 'about', component: AboutComponent, data: {breadcrumb: 'About'}},
  {path: 'admin',loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),canActivate:[AdminGuard], data: {breadcrumb: 'Admin'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Errors'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'Basket'}},
  {path: 'whishlist', loadChildren: () => import('./whishlist/whishlist.module').then(mod => mod.WhishlistModule), data: {breadcrumb: 'Whishlist'}},
  {path: 'checkout',canActivate:[AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'Checkout'}},
  {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: 'orders',canActivate:[AuthGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: {breadcrumb: 'Orders'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
