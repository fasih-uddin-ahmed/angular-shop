import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
// import { userModel } from './../../utilities/common/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  user = this.userSource.asObservable();

  uri = `${environment.serverUrl}/api/user`;

  constructor(
    private http: HttpClient
  ) {
    let currentValue = JSON.parse(localStorage.getItem('users'));
    if (currentValue === null) {
      localStorage.setItem('users', JSON.stringify(new Array()));
    }
  }
  addUser(user) {
    // console.log(user);
    // this.http.post(`${this.uri}/`, user)
    //   .subscribe(res => console.log('user added to db'));

    let currentValue = JSON.parse(localStorage.getItem('users'));
    // if (currentValue === null) {
    if (currentValue.length === 0) {
      localStorage.setItem('users', JSON.stringify([user]));
      this.userSource.next(user);
    } else {
      const updatedValue = [...currentValue, user];
      localStorage.setItem('users', JSON.stringify(updatedValue));
      this.userSource.next(updatedValue);
    }

    // let result = JSON.parse(localStorage.getItem('users'));
    // if (result === null) {
    //   localStorage.setItem('users', JSON.stringify([]));
    // }
    // let currentValue = JSON.parse(localStorage.getItem('users'));
    // if (currentValue.length === 0) {
    //   localStorage.setItem('users', JSON.stringify([user]));
    //   this.userSource.next(user);
    // } else {
    //   const updatedValue = [...currentValue, user];
    //   localStorage.setItem('users', JSON.stringify(updatedValue));
    //   this.userSource.next(updatedValue);
    // }
  }

  getUser(email) {
    // console.log(email);
    // return this.http.get(`${this.uri}/user`, email);

    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    if (users.length === 0) {
      return null;
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
    let users = JSON.parse(localStorage.getItem('users'));
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
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}
