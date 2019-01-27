import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  profilePictureUrl = 'src/assets/img/profil.png';
  form: FormGroup;
  newUser: UserModel;
  authResponse: any;

  constructor(private fb: FormBuilder,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        //id: ['1234', Validators.required],
        email: ['default3@valami.hu', Validators.required],
        password: ['gabiildi', Validators.required],
        name: ['gabiildi', Validators.required],
        repeatPassword: ['gabiildi', Validators.required],
        profilePicUrl: ['default pic url', Validators.required],

      }
    );
  }

  onSubmit() {
    console.log('A regformból adat:', this.form.value);
    this.newUser = this.form.value;
    this._userService.register(this.newUser).subscribe(
      (data) => this.authResponse = this._userService.getfbAuthResponse().localId,
      (error) => console.log('valami hiba', error)
    );


  }

}
