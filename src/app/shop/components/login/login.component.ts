import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from "./../../../utilities/common/userModel";
import { UserService } from "../../Service/user.service";
import { CartService } from "../../Service/cart-detail.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userToLog = new userModel();

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) { }

  onLogin() {
    // console.log(this.userToLog);
    // this.userService.addUser(this.userToLog);

    let user;
    console.log(this.userToLog.email);
    // this.userService.getUser(this.userToLog.email).subscribe(res => user = res);
    user = this.userService.getUser(this.userToLog.email);
    // console.log(user);
    if (!user) {
      // if (!this.userToLog) {
      // this.userToLog = this.userToLog;
      // this.userToLog = user;
      this.userService.addUser(this.userToLog);
      localStorage.setItem('currentUser', JSON.stringify(this.userToLog));
      localStorage.setItem("loggedIn", JSON.stringify(true));
      console.log("userToLog");
    } else {
      // localStorage.setItem('currentUser', JSON.stringify(this.userToLog));
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log("old user found");
      localStorage.setItem("loggedIn", JSON.stringify(true));
    }
    if (this.userToLog.cart) {
      this.cartService.setCartItems(this.userToLog.cart.items);
      this.cartService.setTotalAmount(this.userToLog.cart.totalAmount);
      this.cartService.setTotalQuantity(this.userToLog.cart.totalQuantity);
    }
    // this.router.navigateByUrl("");
  }


  ngOnInit() {
  }

}
