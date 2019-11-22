import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { userModel } from "./../../../utilities/common/userModel";
import { UserService } from "../../Service/user.service";
import { CartService } from "../../Service/cart-detail.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userToLog = new userModel();

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  onLogin() {
    // console.log(this.userToLog);
    // this.userService.addUser(this.userToLog);

    let user;
    console.log(this.userToLog.email);
    this.userService
      .getUser(this.userToLog.email)
      .subscribe(res => {
        user = res
        console.log(user);
      });
    // user = this.userService.getUser(this.userToLog.email);
    console.log(user);
    if (!user) {
      this.toastr.error("No User Found");
    } else {
      // localStorage.setItem('currentUser', JSON.stringify(this.userToLog));
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log("old user found");
      localStorage.setItem("loggedIn", JSON.stringify(true));
      if (user.cart) {
        this.cartService.setCartItems(user.cart.items);
        this.cartService.setTotalAmount(user.cart.totalAmount);
        this.cartService.setTotalQuantity(user.cart.totalQuantity);
      }
    }
    // this.router.navigateByUrl("");
  }

  ngOnInit() { }
}
