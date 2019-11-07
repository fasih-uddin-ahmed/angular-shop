import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userModel } from './../../utilities/common/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSource: BehaviorSubject<userModel> = new BehaviorSubject(new userModel());
  user = this.userSource.asObservable();

  constructor() { }

  addUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.userSource.next(user);
    return this.user;
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  updateUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
