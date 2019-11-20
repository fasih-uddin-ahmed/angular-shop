import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  productSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  product = this.productSource.asObservable();

  products: any;

  uri = `${environment.serverUrl}/api/products`;

  constructor(private http: HttpClient) { }

  // getHeaders() {
  //   const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*").set("Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept").set("Access-Control-Allow-Origin", "http://localhost:4000");
  //   return headers;
  // }

  saveProduct(product) {
    this.http.post(`${this.uri}/`, product)
      .subscribe(res => console.log('product added to db'));

    // let result = JSON.parse(localStorage.getItem('products'));
    // if (result === null) {
    //   localStorage.setItem('products', JSON.stringify([]));
    // }
    // let currentValue = JSON.parse(localStorage.getItem('products'));
    // const updatedValue = [...currentValue, product];
    // // let lenght = currentValue.length;
    // // console.log(length);
    // // currentValue[lenght + 1] = product;
    // // console.log(currentValue);
    // localStorage.setItem('products', JSON.stringify(updatedValue));
    // this.productSource.next(updatedValue);
  }

  getProducts() {
    // return this.http.get(`${this.uri}/`);
    return this.http.get("http://www.mocky.io/v2/5dd426b22f0000f905d4f997/api/products/");

    // let products = JSON.parse(localStorage.getItem('products'));
    // this.productSource.next(products);
    // return this.product;
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
