import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalAmountSource: BehaviorSubject<number> = new BehaviorSubject(0);
  totalAmount = this.totalAmountSource.asObservable();

  ISOSource: BehaviorSubject<string> = new BehaviorSubject("");
  ISO = this.ISOSource.asObservable();

  cartItemsSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  cartItems = this.cartItemsSource.asObservable();

  totalQuantitySource: BehaviorSubject<number> = new BehaviorSubject(0);
  totalQuantity = this.totalQuantitySource.asObservable();

  constructor() { }

  addToCart(object) {
    // this.items.push(object);
    // this.cartItemsSource.next(this.cartItemsSource.value.push(object));
    // this.cartItems.subscribe(array => this.totalQuantitySource.next(array.length));
    // localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSource.value));

    //in case if the memory is cleared from localhost
    let result = JSON.parse(localStorage.getItem('cartItems'));
    if (result == null) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSource.value));
    }

    let currentValue = JSON.parse(localStorage.getItem('cartItems'));
    const updatedValue = [...currentValue, object];

    localStorage.setItem('cartItems', JSON.stringify(updatedValue));
    this.cartItemsSource.next(updatedValue);

    localStorage.setItem('totalQuantity', JSON.stringify(this.cartItemsSource.value.length));
    this.totalQuantitySource.next(this.cartItemsSource.value.length);

    localStorage.setItem('ISO', JSON.stringify(object.product.price.ISO));
    this.ISOSource.next(object.product.price.ISO);
  }

  addTotalAmount(amount) {
    localStorage.setItem('totalAmount', JSON.stringify(amount));
    this.totalAmountSource.next(amount);
  }

  resetCart(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.cartItemsSource.next(items);

    localStorage.setItem('totalQuantity', JSON.stringify(this.cartItemsSource.value.length));
    this.totalQuantitySource.next(this.cartItemsSource.value.length);
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  getTotalAmount() {
    let amount = JSON.parse(localStorage.getItem('totalAmount'));
    this.totalAmountSource.next(amount);

    // let items = this.getCartItems();
    // if (items.length == 0) {
    //   localStorage.setItem('totalAmount', JSON.stringify(0));
    //   this.totalAmountSource.next(0);
    //   return this.totalAmount;
    // } else {
    return this.totalAmount;
    // }
  }

  getTotalQuantity() {
    let quantity = JSON.parse(localStorage.getItem('totalQuantity'));
    this.totalQuantitySource.next(quantity);
    return this.totalQuantity;
  }

  getISO() {
    let iso = JSON.parse(localStorage.getItem('ISO'));
    this.ISOSource.next(iso);
    return this.ISO;
  }

  setCartItems(items) {
    let result = JSON.parse(localStorage.getItem('cartItems'));
    if (result == null) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSource.value));
    }

    let currentValue = []
    const updatedValue = [...currentValue, ...items];

    localStorage.setItem('cartItems', JSON.stringify(updatedValue));
    this.cartItemsSource.next(updatedValue);
  }

  setTotalAmount(amount) {
    localStorage.setItem('totalAmount', JSON.stringify(amount));
    this.totalAmountSource.next(amount);
  }

  setTotalQuantity(quantity) {
    let currentValue = JSON.parse(localStorage.getItem('cartItems'));
    localStorage.setItem('totalQuantity', JSON.stringify(currentValue.length));
    this.totalQuantitySource.next(currentValue.length);
  }

  setISO(iso) {
    localStorage.setItem('ISO', JSON.stringify(iso));
    this.ISOSource.next(iso);
  }
}