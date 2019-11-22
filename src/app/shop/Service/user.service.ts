import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
// import { userModel } from './../../utilities/common/userModel';

@Injectable({
  providedIn: "root"
})
export class UserService {
  userSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  user = this.userSource.asObservable();

  uri = `${environment.serverUrl}/api/user`;

  constructor(private http: HttpClient) {
    let currentValue = JSON.parse(localStorage.getItem("users"));
    if (currentValue === null) {
      localStorage.setItem("users", JSON.stringify(new Array()));
    }
  }

  // getHeaders() {
  //   const headers = new HttpHeaders()
  //     .set("Access-Control-Allow-Origin", "*")
  //     .set(
  //       "Access-Control-Allow-Headers",
  //       "Origin, X-Requested-With, Content-Type, Accept"
  //     )
  //     .set("Access-Control-Allow-Origin", "http://localhost:4000");
  //   return headers;
  // }

  addUser(user) {
    console.log(user);
    this.http
      .post(`${this.uri}/`, user)
      .subscribe(res => console.log("user added to db"));

    // let currentValue = JSON.parse(localStorage.getItem('users'));
    // // if (currentValue === null) {
    // if (currentValue.length === 0) {
    //   localStorage.setItem('users', JSON.stringify([user]));
    //   this.userSource.next(user);
    // } else {
    //   const updatedValue = [...currentValue, user];
    //   localStorage.setItem('users', JSON.stringify(updatedValue));
    //   this.userSource.next(updatedValue);
    // }
  }

  getUsers() {
    return this.http.get(`${this.uri}/`);
  }

  getUser(email) {
    console.log(email);
    return this.http.post(`${this.uri}/user`, email);
    // return this.http.get("http://www.mocky.io/v2/5dd6b06b3200008e4a888c90/api/user/");

    // let users = JSON.parse(localStorage.getItem('users'));
    // if (users === null) {
    //   localStorage.setItem('users', JSON.stringify([]));
    // }
    // if (users.length === 0) {
    //   return null;
    // }
    // if (users.length > 0) {
    //   let foundUser = users.find(user => user.email === email);
    //   if (foundUser) {
    //     return foundUser;
    //   } else {
    //     return null;
    //   }
    // } else {
    //   return null;
    // }
  }

  removeUser() {
    // let users = JSON.parse(localStorage.getItem("user"));
    // users.filter(user => user.email !== currentUser.email);
    // this.updateUser(users);
    // localStorage.removeItem("user");
    localStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.removeItem("currentUser");
  }

  updateUser(user) {
    let users = JSON.parse(localStorage.getItem("users"));
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
