import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { CartService } from "../../Service/cart-detail.service";
import { ToastrService } from 'ngx-toastr';

import * as Utils from './../../../utilities/common/utils';
import { Comment } from './../../../utilities/common/comment';
import { CartItem } from "./../../../utilities/common/cartItem";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  trendingLabel: string = "Trending";
  productList: any = [];
  imageHolder: any;
  product: any;
  parentProduct: any;
  productId: any = null;
  newProducts;

  selectedQuantity: number;
  quantity: number = 0;
  totalAmount: number = 0;

  showMore: boolean = false;

  commentText: string;
  commentRating: number;
  comments: Array<Comment> = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  getProduct(id) {
    this.productService.getProducts().subscribe(res => this.newProducts = res);
    this.productService.getProductDetails().subscribe(response => {
      this.productList = response;
      this.productList = [...this.productList, ...this.newProducts];
      // console.log(id);
      // console.log(this.productList);
      let result = this.productList.filter(p => p.id == id);
      console.log("result", result[0]);
      this.product = result[0];

      this.imageHolder = this.product.imgs[0].url;
      if (this.product.parent) {
        this.parentProduct = this.product;
      }
    });
  }

  onChange() {
    // console.log(this.productId);
    // if (this.productId == this.parentProduct.id) {
    //   this.product = this.parentProduct;
    //   this.imageHolder = this.product.imgs[0].url;
    // } else {
    let result = this.productList.filter(p => p.id == this.productId);
    // console.log("resultchange", result[0]);
    this.product = result[0];
    this.imageHolder = this.product.imgs[0].url;
    this.productId = this.product.id;
    // }
  }

  toggleShow() {
    if (!this.showMore) {
      this.showMore = true;
    } else {
      this.showMore = false;
    }
  }

  selectedImage(img) {
    this.imageHolder = img;
  }

  onInput(number) {
    let result = Utils.onNumericInput(number);
    if (result) this.selectedQuantity = result;
  }

  addToCart() {
    this.cartService.getTotalAmount().subscribe(response => this.totalAmount = response);

    let item = this.checkRepeatedCartItem(this.productId)
    let index = this.getRepeatedItemIndex(item);
    if (this.selectedQuantity > 0) {
      // console.log(item);
      // console.log(index);
      if (item) {
        let cartItems = this.cartService.getCartItems();
        this.quantity = this.selectedQuantity;
        cartItems[index].quantity += this.quantity;
        this.totalAmount += (this.product.price.value * this.selectedQuantity);
        this.cartService.addTotalAmount(this.totalAmount);
        this.cartService.resetCart(cartItems);
        this.toastr.success("Item added in cart Successfully");
      } else {
        this.totalAmount += (this.product.price.value * this.selectedQuantity);
        this.quantity = this.selectedQuantity;

        let cartItem = new CartItem();
        cartItem.id = +this.productId;
        cartItem.quantity = this.quantity;
        cartItem.product = this.product;

        this.cartService.addToCart(cartItem);
        this.cartService.addTotalAmount(this.totalAmount);
        this.toastr.success("Item added in cart Successfully");
      }
    } else {
      this.toastr.warning("please enter the quantity");
    }
  }

  checkRepeatedCartItem(productId) {
    let product;
    let cartItems = this.cartService.getCartItems();
    // this.cartService.cartItems.subscribe(items => cartItems = items);
    console.log(cartItems);
    if (cartItems) {
      cartItems.forEach(item => {
        if (item.id == productId) {
          product = item;
        }
      });
      return product;
    }
  }

  getRepeatedItemIndex(cartItem) {
    let cartItems;
    // this.cartService.cartItems.subscribe(items => cartItems = items);
    cartItems = this.cartService.getCartItems();
    if (cartItems && cartItem) {
      // let result = cartItems.findIndex(p => p === cartItem);
      let result;
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === cartItem.id) { result = i; break; }
      }
      console.log(result);
      return result;
    }
  }

  onCommentSubmit() {
    if (this.commentText.length > 0) {
      let comment = new Comment();
      comment.text = this.commentText;
      comment.rating = this.commentRating;
      comment.like = false;
      this.comments.push(comment);
      this.commentText = "";
      this.commentRating = 0;
    }
  }

  onLike(comment) {
    comment.like = !comment.like;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.productId = id;
      this.getProduct(id);
    });
  }
}