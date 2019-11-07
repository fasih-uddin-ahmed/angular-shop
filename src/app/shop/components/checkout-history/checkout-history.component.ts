import { Component, OnInit } from '@angular/core';
import { CheckoutService } from "../../Service/checkout.service";

@Component({
  selector: 'app-checkout-history',
  templateUrl: './checkout-history.component.html',
  styleUrls: ['./checkout-history.component.css']
})
export class CheckoutHistoryComponent implements OnInit {

  checkoutHistory;
  checkoutItems;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  // itemsToShow(items) {
  //   this.checkoutItems = items.checkoutItems;
  // }

  ngOnInit() {
    this.checkoutHistory = this.checkoutService.getCheckoutHistory();
    console.log(this.checkoutHistory);
  }

}
