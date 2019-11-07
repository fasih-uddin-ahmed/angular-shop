import { Component, OnInit } from '@angular/core';
import { CheckoutService } from "../../Service/checkout.service";

declare var $: any;

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css']
})
export class OrderProcessComponent implements OnInit {

  checkedoutOrders;
  selectedItem;
  selectedOrderStatus;
  rejectReason: String = "";
  statuses = ['Pending', 'Approved', 'Rejected'];

  constructor(
    private checkoutService: CheckoutService
  ) { }

  onChange(item, status) {
    this.selectedItem = item;
    // this.selectedOrderStatus = status;
    if (status === 'Approved') {
      $(document).ready(() => {
        $('#confirmModalForApprove').modal('show');
      });
    }
    if (status === 'Rejected') {
      $(document).ready(() => {
        $('#confirmModalForReject').modal('show');
      });
    }
  }

  onYesSelect() {
    console.log(this.selectedItem);
    this.checkedoutOrders.forEach(item => {
      if (item.orderId === this.selectedItem.orderId) {
        item.rejectReason = this.rejectReason;
      }
    });
    console.log(this.checkedoutOrders);
    this.checkoutService.resetCheckoutHistory(this.checkedoutOrders);
  }

  onNoSelect() {
    this.checkedoutOrders.forEach(item => {
      if (item.orderId === this.selectedItem.orderId) {
        item.status = "Pending";
      }
    });
    console.log(this.checkedoutOrders);
    this.checkoutService.resetCheckoutHistory(this.checkedoutOrders);
  }

  ngOnInit() {
    this.checkedoutOrders = this.checkoutService.getCheckoutHistory();
  }

}
