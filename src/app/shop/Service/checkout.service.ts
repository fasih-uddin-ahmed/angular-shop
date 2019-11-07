import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  checkoutSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  checkout = this.checkoutSource.asObservable();

  constructor() { }

  addToCheckout(object) {
    let result = JSON.parse(localStorage.getItem('checkoutHistory'));
    if (result === null) {
      localStorage.setItem('checkoutHistory', JSON.stringify(this.checkoutSource.value));
    }
    let currentValue = JSON.parse(localStorage.getItem('checkoutHistory'));
    const updatedValue = [...currentValue, object];
    localStorage.setItem('checkoutHistory', JSON.stringify(updatedValue));
    this.checkoutSource.next(updatedValue);
  }

  getCheckoutHistory() {
    return JSON.parse(localStorage.getItem('checkoutHistory'));
  }

  resetCheckoutHistory(item) {
    localStorage.setItem('checkoutHistory', JSON.stringify(item));
  }
}
