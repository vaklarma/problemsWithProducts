import {Injectable} from '@angular/core';
import {UserModel} from './user-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FirebaseRegistrationModel} from './firebase-registration-model';
import {map, switchMap, tap} from 'rxjs/operators';
import {from, Observable, ReplaySubject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  public currentUser = new ReplaySubject<UserModel | string>(1);
  private _user = new ReplaySubject<UserModel>(1);
  private _fbAuthData: any;


  constructor(private _http: HttpClient) {
    firebase.auth().onAuthStateChanged(
      user => {

        if (user != null) {
          console.log('Be van lépve', user.email);
          this._fbAuthData = user;
          this.getUserById(user.uid).subscribe(
            (remoteUser) => {
              if (remoteUser) {
                this._user.next(remoteUser);
                this.currentUser.next(remoteUser.name);
              } else {
                // TODO Unnecessary login without profil data. You should use one stream
                // Ez az az ág, amikor ugyan be tud lépni, de a user adatokat nem tudja betölteni a http.get().
                // Ezt egy stream- ként kellene kezeli, aminek a subscribe ágában lehet kezelni a hibát
                 this.logout();
              }
            },
            (error) => console.log('hol adatok??? ', error)
          );
          this.isLoggedIn$.next(true);
        } else {
          this.isLoggedIn$.next(false);
          this.currentUser.next(null);
          console.log('hol adatok??? ');
          this._user.next(null);
          console.log('Nincs belépve', user);
        }
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(firebase.auth().signInWithEmailAndPassword(email, password));
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

  getUserById(fbid: string) {
    console.log('getUser');
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  getfbAuthResponse(): FirebaseRegistrationModel {
    console.log('UserServicegetfbauthdata', this._fbAuthData);
    return this._fbAuthData;
  }

  getLoggedInUser() {
    return this._user;
  }


  saveNewUserToFbDatabase(newUser: UserModel) {
    return this._http.put(`${environment.firebase.baseUrl}/users/${newUser.id}.json`, newUser);
  }

  logout() {
    firebase.auth().signOut();
    console.log('exit');
  }
}
