import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { ShopModule } from './shop/shop.module';

import { AppComponent } from "./app.component";
import { CartService } from "./shop/Service/cart-detail.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ShopModule],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
