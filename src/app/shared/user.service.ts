import {Injectable} from '@angular/core';
import {UserModel} from './user-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {FirebaseRegistrationModel} from './firebase-registration-model';

import {map, switchMap, tap} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = new ReplaySubject(1);
  private _user: UserModel;
  private _fbAuthData: FirebaseRegistrationModel;

  constructor(private _http: HttpClient) {
    firebase.auth().onAuthStateChanged(
      user => {
        console.log('Be van lépve', user);
        if (!user == null) {
          this.isLoggedIn.next(true);
        } else {
          this.isLoggedIn.next(false);
          console.log('Nincs belépve', user);
        }
      }
    );
    this._user = {
      id: '01user',
      email: 'acsdcsdc@asasxa.hu',
      password: 'pppppppp',
      profilePictureUrl: 'pic',
      permission: 'worker',
      name: 'makmarci'
    };
  }

  register(newUser: UserModel) {
    return this._http.post<FirebaseRegistrationModel>(`${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
      {
        'email': newUser.email,
        'password': newUser.password,
        'returnSecureToken': true
      }
    )
      .pipe(tap((fbAuthResponse: FirebaseRegistrationModel) => {

        this._fbAuthData = fbAuthResponse;
        console.log('tap: ', this._fbAuthData);
      }))
      .pipe(map(fbreg => {

        return {
          id: fbreg.localId,
          ...newUser
        };
      }))

      .pipe(switchMap(user => this.saveNewUserToFbDatabase(user)));
  }

  getfbAuthResponse(): FirebaseRegistrationModel {
    console.log('UserServicegetfbauthdata', this._fbAuthData);
    return this._fbAuthData;
  }

  getAllUser() {
    return this._user;
  }

  setNewUser(newUser: UserModel) {
    this._user = newUser;
  }

  saveNewUserToFbDatabase(newUser: UserModel) {
    return this._http.put(`${environment.firebase.baseUrl}/users/${newUser.id}.json`, newUser);
  }
}
