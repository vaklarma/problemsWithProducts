import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
