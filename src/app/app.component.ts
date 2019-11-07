import { Component, OnInit } from "@angular/core";
import { CartService } from './shop/Service/cart-detail.service';
import { UserService } from "./shop/Service/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) { }

  title = "My Shop";
  cartTotalAmount;
  cartTotalQuantity;
  cartISO;
  user;

  onLogOut() {
    this.userService.removeUser();
  }

  ngOnInit() {
    this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);
    this.cartService.getTotalQuantity().subscribe(response => this.cartTotalQuantity = response);
    this.cartService.getISO().subscribe(response => this.cartISO = response);

    // this.user = JSON.parse(localStorage.getItem("user"));
    this.userService.getUser().subscribe(res => this.user = res);
  }
}
