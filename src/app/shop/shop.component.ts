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
  featureLabel: string = "Featured";
  products: any = [];
  popularProducts: any = [];
  trendingProducts: any = [];
  featureProducts: any = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
    })
    this.popularProducts = this.products.filter(item => item.productType === 'popular');
    this.trendingProducts = this.products.filter(item => item.productType === 'trending');
    this.featureProducts = this.products.filter(item => item.productType === 'feature');
  }

}
