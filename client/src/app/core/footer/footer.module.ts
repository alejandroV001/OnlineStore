import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { OrdersComponent } from './orders/orders.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ReturnsPolicyComponent } from './returns-policy/returns-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';


@NgModule({
  declarations: [
  
    DeliveryInfoComponent,
       OrdersComponent,
       PricingComponent,
       AboutComponent,
       FeaturesComponent,
       ReturnsPolicyComponent,
       TermsAndConditionsComponent,
       CookieComponent,
       PrivacyNoticeComponent,
       TermsOfUseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FooterModule { }
