import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../Service/user.service";
import { userModel } from "./../../../utilities/common/userModel";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userToSignup = new userModel();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  onSignup() {
    let user = this.userService.getUser(this.userToSignup.email);
    console.log(user);
    if (user) {
      this.toastr.error("User with this email alredy exists.");
    } else {
      this.userService.addUser(this.userToSignup);
      localStorage.setItem('currentUser', JSON.stringify(this.userToSignup));
      localStorage.setItem("loggedIn", JSON.stringify(true));
      console.log("userToLog");
    }
  }

  ngOnInit() {
  }

}
