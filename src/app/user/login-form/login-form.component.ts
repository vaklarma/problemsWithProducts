import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('login button');
    this._userService.login('default3@valami.hu', 'gabiildi');
  }
}
