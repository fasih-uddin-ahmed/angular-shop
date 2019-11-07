import { Component, OnInit } from '@angular/core';
import { ProductService } from './Service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  trendingLabel: string = "Trending";
  popularLabel: string = "Popular";
  products: any = [];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getJsonProducts().subscribe(response => {
      this.products = response[0];
      // console.info(response);
    })
  }

}
