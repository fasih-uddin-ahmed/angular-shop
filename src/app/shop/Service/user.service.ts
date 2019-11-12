import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userModel } from './../../utilities/common/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  user = this.userSource.asObservable();

  constructor() { }

  addUser(user) {
    // localStorage.setItem("user", JSON.stringify(user));

    let result = JSON.parse(localStorage.getItem('user'));
    if (result === null) {
      localStorage.setItem('user', JSON.stringify([]));
    }
    let currentValue = JSON.parse(localStorage.getItem('user'));
    const updatedValue = [...currentValue, user];
    localStorage.setItem('user', JSON.stringify(updatedValue));
    this.userSource.next(updatedValue);
  }

  getUser(email) {
    let users = JSON.parse(localStorage.getItem('user'));
    if (users === null) {
      localStorage.setItem('user', JSON.stringify([]));
    }
    if (users.length > 0) {
      let foundUser = users.find(user => user.email === email);
      if (foundUser) {
        return foundUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  removeUser() {
    // let users = JSON.parse(localStorage.getItem("user"));
    // users.filter(user => user.email !== currentUser.email);
    // this.updateUser(users);
    // localStorage.removeItem("user");
    localStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.removeItem('currentUser');
  }

  updateUser(user) {
    let users = JSON.parse(localStorage.getItem('user'));
    let index;
    let i = 0;
    users.forEach(u => {
      if (u.email === user.email) {
        index = i;
        return;
      }
      i++;
    });
    users[index] = user;
    localStorage.setItem("user", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}
