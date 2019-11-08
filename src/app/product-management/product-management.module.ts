import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopModule } from './../shop/shop.module';


@NgModule({
  declarations: [ListProductsComponent, HomepageComponent],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ShopModule
  ]
})
export class ProductManagementModule { }
