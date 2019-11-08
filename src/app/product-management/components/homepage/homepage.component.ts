import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  toggle: boolean;
  editItemId: number;

  constructor() { }

  toggleComponent() {
    this.toggle = !this.toggle;
  }

  toggleEdit(id) {
    this.toggle = !this.toggle;
    this.editItemId = id;
  }

  ngOnInit() {
    this.toggle = true;
  }

}
