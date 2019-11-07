import { Component, OnInit } from '@angular/core';
import { CheckoutService } from "../../Service/checkout.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css']
})
export class CheckoutDetailComponent implements OnInit {

  checkoutItem;
  checkoutItemId;
  totalAmount;
  tax = 10;

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.checkoutItemId = params.get('orderId');
    });
    // console.log(this.checkoutItemId);
    let items = this.checkoutService.getCheckoutHistory();
    // console.log(items);
    let result = items.filter(item => item.orderId == this.checkoutItemId);
    this.checkoutItem = result[0];
    // console.log(this.checkoutItem);
    this.totalAmount = this.checkoutItem.checkoutTotalAmount;
  }

}
