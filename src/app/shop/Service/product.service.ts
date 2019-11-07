import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ProductService {

  productSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  product = this.productSource.asObservable();

  products: any;

  constructor(private http: HttpClient) { }


  saveProduct(product) {
    let result = JSON.parse(localStorage.getItem('products'));
    if (result === null) {
      localStorage.setItem('products', JSON.stringify([]));
    }
    let currentValue = JSON.parse(localStorage.getItem('products'));
    const updatedValue = [...currentValue, product];
    // let lenght = currentValue.length;
    // console.log(length);
    // currentValue[lenght + 1] = product;
    // console.log(currentValue);
    localStorage.setItem('products', JSON.stringify(updatedValue));
    this.productSource.next(updatedValue);
  }

  getProducts() {
    let products = JSON.parse(localStorage.getItem('products'));
    this.productSource.next(products);
    return this.product;
  }

  resetProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
    this.productSource.next(products);
  }

  getJsonProducts() {
    return this.products = this.http.get("/assets/product-list.json");
  }

  getProductDetails() {
    return this.products = this.http.get("/assets/product-list-detail.json");
  }
}
