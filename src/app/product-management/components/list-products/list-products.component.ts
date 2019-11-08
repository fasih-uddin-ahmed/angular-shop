import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../../shop/Service/product.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  @Output() editItemId: EventEmitter<any> = new EventEmitter();
  productsList: any;

  constructor(
    private productService: ProductService
  ) { }

  onEdit(id) {
    // this.toggle = !this.toggle;
    this.editItemId.emit(id);
  }

  onDelete(id) {
    let products = this.productsList.filter(item => item.id !== id);
    this.productService.resetProducts(products);
    this.productsList = products;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.productsList = res);
    console.log(this.productsList);
  }

}
