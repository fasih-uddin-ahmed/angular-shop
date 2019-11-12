import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { ShopModule } from './shop/shop.module';

import { AppComponent } from "./app.component";
import { CartService } from "./shop/Service/cart-detail.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, AppRoutingModule,
    ShopModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
