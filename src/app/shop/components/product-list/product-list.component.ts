import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserService } from "../../Service/user.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {

  @Input() label;
  @Input() products;
  // @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  searchText;
  loggedUser;

  date = "Available on August 30, 2019";

  constructor(
    private userService: UserService
  ) { }

  onClick(id) {
    const url = environment.productDetailUrl + id;
    window.open(url, "_blank");
  }

  // onDelete(id) {
  //   this.deleteItem.emit(id);
  // }

  ngOnInit() {
    // this.userService.getUser().subscribe(res => this.loggedUser = res);
    // this.loggedUser = this.userService.getUser();

    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
