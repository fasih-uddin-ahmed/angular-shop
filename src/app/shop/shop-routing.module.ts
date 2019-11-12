import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShopComponent } from "./shop.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CheckoutHistoryComponent } from "./components/checkout-history/checkout-history.component";
import { ThankYouPageComponent } from "./components/thank-you-page/thank-you-page.component";
import { CheckoutDetailComponent } from "./components/checkout-detail/checkout-detail.component";
import { OrderProcessComponent } from "./components/order-process/order-process.component";
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: ShopComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "productDetail/:id", component: ProductDetailComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "checkoutHistory", component: CheckoutHistoryComponent },
  { path: "thankyou/:orderId", component: ThankYouPageComponent },
  { path: "checkoutDetail/:orderId", component: CheckoutDetailComponent },
  { path: "processOrder", component: OrderProcessComponent },
  { path: "profile", component: ProfileComponent },
  { path: "addProduct", component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
