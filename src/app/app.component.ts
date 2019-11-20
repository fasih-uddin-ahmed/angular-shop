import { Component, OnInit } from "@angular/core";
import { CartService } from './shop/Service/cart-detail.service';
import { UserService } from "./shop/Service/user.service";
import { userModel } from "./utilities/common/userModel";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) { }

  title = "My Shop";
  cartItems;
  cartTotalAmount;
  cartTotalQuantity;
  cartISO;
  user;
  loggedIn;



  onLogOut() {
    this.cartItems = this.cartService.getCartItems();
    console.log("onlogoutclicked");
    if (this.cartItems) {
      this.user.cart = {
        items: this.cartItems,
        totalAmount: this.cartTotalAmount,
        totalQuantity: this.cartTotalQuantity
      }
      console.log(this.user);
      this.userService.updateUser(this.user);
    }

    // this.user.cart = {
    //   items: [],
    //   totalAmount: 0,
    //   totalQuantity: 0
    // }
    this.cartService.setCartItems([]);
    this.cartService.setTotalAmount(0);
    this.cartService.setTotalQuantity(0);
    console.log(this.user);
    this.userService.removeUser();
  }


  ngOnInit() {
    this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);
    this.cartService.getTotalQuantity().subscribe(response => this.cartTotalQuantity = response);
    this.cartService.getISO().subscribe(response => this.cartISO = response);
    this.cartItems = this.cartService.getCartItems();

    // this.userService.getUser().subscribe(res => this.user = res);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  }
}
