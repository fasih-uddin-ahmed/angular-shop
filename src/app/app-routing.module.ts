import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  // {
  //   path: "",
  //   loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule)
  // },
  // { path: 'product-management', loadChildren: './product-management/product-management.module#LazyModule' }
  { path: 'product-management', loadChildren: () => import("./product-management/product-management.module").then(m => m.ProductManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
