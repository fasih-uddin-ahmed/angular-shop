import { Component, OnInit } from '@angular/core';
import { CheckoutService } from "../../Service/checkout.service";

@Component({
  selector: 'app-checkout-history',
  templateUrl: './checkout-history.component.html',
  styleUrls: ['./checkout-history.component.css']
})
export class CheckoutHistoryComponent implements OnInit {

  checkoutHistory;
  loggedUser;
  // checkoutItems;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  // itemsToShow(items) {
  //   this.checkoutItems = items.checkoutItems;
  // }

  ngOnInit() {
    this.checkoutHistory = this.checkoutService.getCheckoutHistory();
    this.loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    this.checkoutHistory = this.checkoutHistory.filter(items => items.user === this.loggedUser.email);
    console.log(this.checkoutHistory);
  }

}
