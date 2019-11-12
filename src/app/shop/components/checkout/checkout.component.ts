import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from "../../Service/cart-detail.service";
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../Service/user.service";
import { CheckoutService } from "../../Service/checkout.service";

// import * as Utils from './../../../utilities/common/utils';
import { userBillingModel } from './../../../utilities/common/userBillingModel';
import { userShippingModel } from './../../../utilities/common/userShippingModel'
import { userModel } from "./../../../utilities/common/userModel";
import { CheckoutItem } from "../../../utilities/common/checkoutItem";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems;
  cartTotalAmount;
  cartItemToDelete;
  tax = 10;
  checkoutAmount;
  logInPopup = false;
  loggedInStatus: any;
  loggedUser: any;
  userBill = new userBillingModel();
  userShip = new userShippingModel();
  newUser = new userModel();

  userBillForm: FormGroup;
  userShipForm: FormGroup;
  payment: boolean;
  sameShippingAddressCheck;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private toastr: ToastrService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private route: Router
  ) { }

  changeItemQuantity(id, newQuantity) {
    if (newQuantity <= 0 || newQuantity >= 1000) {
      this.toastr.warning("please enter the right quantity");
      return;
    } else {
      // this.cartService.totalAmountSource.subscribe(quantity => this.cartTotalAmount = quantity);
      this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);
      let index = this.cartItems.findIndex(item => item.id == id);
      // console.log(index);
      let prevQuantity = this.cartItems[index].quantity;
      this.cartItems[index].quantity = newQuantity;

      if (newQuantity > prevQuantity) {
        this.cartTotalAmount += (newQuantity - prevQuantity) * this.cartItems[index].product.price.value;
      } else {
        this.cartTotalAmount -= prevQuantity * this.cartItems[index].product.price.value;
        this.cartTotalAmount += newQuantity * this.cartItems[index].product.price.value;
      }

      this.toastr.success("Quantity Updated Successfully");

      this.cartService.addTotalAmount(this.cartTotalAmount);
      this.checkoutAmount = this.cartTotalAmount + this.tax;

      this.cartService.resetCart(this.cartItems);
    }
  }

  itemToDelete(item) {
    this.cartItemToDelete = item;
  }

  deleteCartItem(cartItem) {

    this.cartService.totalAmountSource.subscribe(amount => this.cartTotalAmount = amount);

    console.log(cartItem);
    this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);

    let newTotalAmount = this.cartTotalAmount - (cartItem.quantity * cartItem.product.price.value);
    this.cartService.addTotalAmount(newTotalAmount);
    this.checkoutAmount = newTotalAmount + this.tax;

    this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);

    this.cartService.resetCart(this.cartItems);

    this.toastr.success("Item Deleted Successfully");

    // console.log(this.cartItems);
    // let index = this.cartItems.findIndex(item => item.product.id === cartItem.product.id);
    // let item = this.cartItems[index];
    // console.log(index);
    // console.log(item);
    // this.cartItems = this.cartItems.splice(index, 1);
    // console.log(this.cartTotalAmount);

    // this.totalAmountSource.next(newTotalAmount);
    // let newCart = this.cartItemsSource.value.splice(id, 1);
    // this.cartItemsSource.next(newCart);
    // this.totalQuantitySource.next(this.cartItemsSource.value.length);
  }

  sameShippingAddress() {
    // if (this.userBill.sameShippingAddress) {
    //   this.userShip.firstName = this.userBill.firstName;
    //   this.userShip.lastName = this.userBill.lastName;
    //   this.userShip.email = this.userBill.email;
    //   this.userShip.address = this.userBill.address;
    //   this.userShip.country = this.userBill.country;
    //   this.userShip.state = this.userBill.state;
    //   this.userShip.zipCode = this.userBill.zipCode;
    // }
    if (this.userBillForm.controls['sameShippingAddress'].value) {
      this.userShipForm.controls['firstName'].setValue(this.userBillForm.controls['firstName'].value);
      this.userShipForm.controls['lastName'].setValue(this.userBillForm.controls['lastName'].value);
      this.userShipForm.controls['email'].setValue(this.userBillForm.controls['email'].value);
      this.userShipForm.controls['address'].setValue(this.userBillForm.controls['address'].value);
      this.userShipForm.controls['country'].setValue(this.userBillForm.controls['country'].value);
      this.userShipForm.controls['state'].setValue(this.userBillForm.controls['state'].value);
      this.userShipForm.controls['zip'].setValue(this.userBillForm.controls['zip'].value);
    }
  }

  saveInfo() {
    // if (this.userBill.saveInfo) {
    // console.log('went to save info');
    if (this.userBillForm.controls['saveInfo'].value) {
      localStorage.setItem("userBill", JSON.stringify(this.userBillForm.value));
    } else {
      localStorage.removeItem("userBill");
    }
  }

  validateForm() {
    if (this.cartItems.length == 0) {
      this.toastr.error("No Items in the cart!");
      return 0;
    } else {
      if (!this.userBill.firstName || !this.userShip.firstName) {
        this.toastr.error("please enter the first name!");
      }
      if (!this.userBill.lastName || !this.userShip.lastName) {
        this.toastr.error("please enter the last name!");
      }
      if (!this.userBill.address || !this.userShip.address) {
        this.toastr.error("please enter the address!");
      }
      if (!this.userBill.country || !this.userShip.country) {
        this.toastr.error("please enter the country!");
      }
      if (!this.userBill.state || !this.userShip.state) {
        this.toastr.error("please enter the state!");
      }
      if (!this.userBill.zipCode || !this.userShip.zipCode) {
        this.toastr.error("please enter the zip code!");
      }
      if (!this.userBill.payment) {
        this.toastr.error("please select the payment method!");
      }
      if (!this.userBill.nameOnCard && !this.userBill.payment) {
        this.toastr.error("please write your name written on credit card!");
      }
      if (!this.userBill.creditCardNumber && !this.userBill.payment) {
        this.toastr.error("please write your credit card number!");
      }
      if (!this.userBill.expiration && !this.userBill.payment) {
        this.toastr.error("please write credit card expiration date!");
      }
      if (!this.userBill.cvv && !this.userBill.payment) {
        this.toastr.error("please write your credit card cvv!");
      }
      if (this.userBill.firstName && this.userShip.firstName && this.userBill.lastName && this.userShip.lastName && this.userBill.address && this.userShip.address && this.userBill.country && this.userShip.country && this.userBill.state && this.userShip.state && this.userBill.zipCode && this.userShip.zipCode && this.userBill.payment && !this.userBill.sameShippingAddress && this.userBill.nameOnCard && this.userBill.creditCardNumber && this.userBill.expiration && this.userBill.cvv && !this.userBill.payment) {
        this.validateUser();
      }
      if (this.userBill.firstName && this.userBill.lastName && this.userBill.address && this.userBill.country && this.userBill.state && this.userBill.zipCode && this.userBill.payment && this.userBill.sameShippingAddress && this.userBill.payment) {
        this.validateUser();
      }
    }
  }

  validateUser() {
    if (this.loggedInStatus) {
      this.makeCheckoutItem();
    } else {
      this.logInPopup = true;
    }
  }

  makeItemId() {
    return new Date().valueOf();
  }

  makeCheckoutItem() {
    let item = new CheckoutItem();
    item.orderId = this.makeItemId();
    item.checkoutItems = this.cartItems;
    item.checkoutTotalAmount = this.checkoutAmount;
    item.date = new Date();
    item.status = "Pending";
    item.rejectReason = "";
    item.user = this.loggedUser.email;
    console.log(item);
    this.toastr.success("Checkedout Successfully");
    this.checkoutService.addToCheckout(item);
    this.route.navigate(['/thankyou', item.orderId]);
  }

  onSubmit() {
    if (this.cartItems.length == 0) {
      this.toastr.error("No Items in the cart!");
      return;
    }
    // let result = this.validateForm();
    this.sameShippingAddress();
    this.saveInfo();
    this.validateUser();
    // console.log(this.userBill);
  }

  onLogin() {
    console.log(this.newUser);
    this.logInPopup = false;
    // let user = JSON.parse(localStorage.getItem('user'));
    // if (!(user.email.localeCompare(this.newUser.email) && user.password.localeCompare(this.newUser.password))) {
    //   console.log("user already in db");
    // } else {
    //   console.log("new user added in db");

    if (this.newUser.email === "admin") {
      this.newUser.role = "admin";
    }
    this.loggedUser = this.userService.getUser(this.newUser.email);
    if (!this.loggedUser) {
      this.loggedUser = this.newUser;
      this.userService.addUser(this.newUser);
      localStorage.setItem('currentUser', JSON.stringify(this.newUser));
      console.log("newUser");
      this.makeCheckoutItem();
    } else {
      localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
      localStorage.setItem("loggedIn", JSON.stringify(true));
      console.log("old user found");
      this.makeCheckoutItem();
    }
  }

  onModelDismiss() {
    this.logInPopup = false;
    this.toastr.error("you must login firts to checkout.");
  }

  get f() { return this.userBillForm.controls; }
  get fv() { return this.userShipForm.controls; }

  showPaymentMethod() {
    // console.log(this.userBillForm.controls['payment'].value);
    return this.userBillForm.controls['payment'].value === 'true' ? true : false;
  }

  getSameShippingAddress() {
    // console.log(this.userBillForm.controls['sameShippingAddress'].value);
    return this.userBillForm.controls['sameShippingAddress'].value;
  }

  ngOnInit() {
    // this.cartService.cartItems.subscribe(items => this.cartItems = items);
    this.cartItems = this.cartService.getCartItems();
    this.cartService.getTotalAmount().subscribe(response => this.cartTotalAmount = response);
    this.checkoutAmount = this.cartTotalAmount + this.tax;
    // console.log(this.cartItems);

    this.loggedInStatus = JSON.parse(localStorage.getItem('loggedIn'));
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));

    // this.userBill.sameShippingAddress = true;
    let userInfo = JSON.parse(localStorage.getItem("userBill"));
    if (userInfo) {
      this.userBillForm = this.fb.group({
        firstName: [userInfo.firstName, Validators.required],
        lastName: [userInfo.lastName, Validators.required],
        email: [userInfo.email, [Validators.required, Validators.email]],
        address: [userInfo.address, Validators.required],
        country: [userInfo.country, Validators.required],
        state: [userInfo.state, Validators.required],
        zip: [userInfo.zip, Validators.required],
        sameShippingAddress: [userInfo.sameShippingAddress, ''],
        saveInfo: [userInfo.saveInfo, ''],
        payment: [userInfo.payment, Validators.required],
        nameOnCard: [userInfo.nameOnCard, Validators.required],
        creditCardNumber: [userInfo.creditCardNumber, Validators.required],
        expiration: [userInfo.expiration, Validators.required],
        cvv: [userInfo.cvv, Validators.required]
      });
    } else {
      this.userBillForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        sameShippingAddress: [true, ''],
        saveInfo: [false, ''],
        payment: ['', Validators.required],
        nameOnCard: ['', Validators.required],
        creditCardNumber: ['', Validators.required],
        expiration: ['', Validators.required],
        cvv: ['', Validators.required]
      });
    }

    this.userShipForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
  }
}
