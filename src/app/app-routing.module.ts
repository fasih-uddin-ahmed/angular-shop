import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  // {
  //   path: "product-list",
  //   loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
