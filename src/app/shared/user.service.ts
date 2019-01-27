import {Injectable} from '@angular/core';
import {UserModel} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = true;
  private _user: UserModel;

  constructor() {
    this._user = {
      id: '01user',
      email: 'acsdcsdc@asasxa.hu',
      password: 'pppppppp',
      profilePictureUrl: 'pic',
      permission: 'worker',
      name: 'makmarci'
    };
  }

  getAllUser() {
    return this._user;
  }
  setNewUser(newUser: UserModel) {
    this._user = newUser;
  }
}
