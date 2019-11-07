import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../pipes/safe.pipe';
// import { FilterPipe } from './../pipes/filter.pipe';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutHistoryComponent } from './components/checkout-history/checkout-history.component';

import { ProductService } from './Service/product.service';
import { CartService } from './Service/cart-detail.service';
import { UserService } from "./Service/user.service";
import { CheckoutService } from "./Service/checkout.service";
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { OrderProcessComponent } from './components/order-process/order-process.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [ShopComponent, ProductListComponent, ProductDetailComponent, SafePipe, CheckoutComponent, CheckoutHistoryComponent, ThankYouPageComponent, CheckoutDetailComponent, OrderProcessComponent, ProfileComponent, AddProductComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-bottom-right'
      }
    )
  ],
  exports: [
    ShopComponent, ProductListComponent, ProductDetailComponent
  ],
  providers: [
    ProductService, CartService, UserService, CheckoutService
  ]
})
export class ShopModule { }
