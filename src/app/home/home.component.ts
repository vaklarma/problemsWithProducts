import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isLoggedIn: boolean;
  constructor(private _userServise: UserService) { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

}
