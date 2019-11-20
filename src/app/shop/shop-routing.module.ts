import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../helper/auth.guard";

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
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "", component: ShopComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "productDetail/:id", component: ProductDetailComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "checkoutHistory", component: CheckoutHistoryComponent, canActivate: [AuthGuard] },
  { path: "thankyou/:orderId", component: ThankYouPageComponent, canActivate: [AuthGuard] },
  { path: "checkoutDetail/:orderId", component: CheckoutDetailComponent, canActivate: [AuthGuard] },
  { path: "processOrder", component: OrderProcessComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "addProduct", component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
