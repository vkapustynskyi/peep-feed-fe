import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: any = [
    {isFavourite: false, description: "asdasd", imgUrl: null, name: "Good name", price: 12, uuid: 'wewerwer32343f3rf'},
    {isFavourite: true, description: "asdasd", imgUrl: null, name: "Good name", price: 12, uuid: 'wewerwer32343f3rf'},
    {isFavourite: false, description: "asdasd", imgUrl: null, name: "Good name", price: 12, uuid: 'wewerwer32343f3rf'},
    {isFavourite: false, description: "asdasd", imgUrl: null, name: "Good name", price: 12, uuid: 'wewerwer32343f3rf'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
