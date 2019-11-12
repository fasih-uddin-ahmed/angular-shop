import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  url: string;
  userForm: FormGroup;
  isTextFieldType: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target;
        this.url = target.result;
        // this.url = JSON.parse(event.target.result);
      }
    }
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.user.firstName = this.userForm.controls['firstName'].value;
    this.user.lastName = this.userForm.controls['lastName'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.imgUrl = this.url;
    console.log(this.user);
    this.userService.updateUser(this.user);
  }

  ngOnInit() {
    // this.userService.getUser().subscribe(res => this.user = res);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user) {
      this.userForm = this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: [this.user.password, Validators.required],
      });
      this.url = this.user.imgUrl;
    } else {
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [this.user.password, Validators.required],
      });
    }
  }

}
