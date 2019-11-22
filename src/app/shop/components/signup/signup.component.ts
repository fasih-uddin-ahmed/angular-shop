import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../Service/user.service";
import { userModel } from "./../../../utilities/common/userModel";
import { CartService } from './../../Service/cart-detail.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userToSignup = new userModel();
  cartItems: any;
  cartTotalAmount: any;
  cartTotalQuantity: any;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  onSignup() {
    let user;
    // user = this.userService.getUser(this.userToSignup.email);
    this.userService.getUser(this.userToSignup.email).subscribe(res => {
      user = res;
      console.log(user);
    });
    console.log(user);
    if (user) {
      this.toastr.error("User with this email alredy exists.");
    } else {
      if (this.cartItems) {
        this.userToSignup.cart.items = this.cartItems;
        this.userToSignup.cart.totalAmount = this.cartItems;
        this.userToSignup.cart.totalQuantity = this.cartItems;
      }
      this.userService.addUser(this.userToSignup);
      localStorage.setItem('currentUser', JSON.stringify(this.userToSignup));
      localStorage.setItem("loggedIn", JSON.stringify(true));
      console.log("userToLog");
    }
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);
    this.cartService.getTotalQuantity().subscribe(response => this.cartTotalQuantity = response);
  }

}
