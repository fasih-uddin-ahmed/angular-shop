import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ListProductsComponent } from './components/list-products/list-products.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'listProducts', component: ListProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
