import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../../shop/Service/product.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  @Output() editItemId: EventEmitter<any> = new EventEmitter();
  productsList: any;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  onEdit(id) {
    // this.toggle = !this.toggle;
    this.editItemId.emit(id);
  }

  onDelete(id) {
    let products = this.productsList.filter(item => item.id !== id);
    this.productService.resetProducts(products);
    this.productsList = products;
    this.toastr.error("Product Deleted Successfully");
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.productsList = res);
    console.log(this.productsList);
  }

}
