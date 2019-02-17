import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {minimumPasswordLength} from './registration-form.validator';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  newUser: UserModel;
  authResponse: any;

  constructor(private fb: FormBuilder,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        //id: ['1234', Validators.required],
        email: ['default3@valami.hu', [Validators.required, Validators.email]],
        password: ['gabiildi', minimumPasswordLength(() => {
          return this.newUser;
        })],
        name: ['gabiildi', [Validators.required, Validators.minLength(15), Validators.pattern('[a-zA-Z ]*')]],
        repeatPassword: ['gabiildi', Validators.required],
        profilePicUrl: ['default pic url', Validators.required],

      }
    );
  }

  onSubmit() {
    console.log('A regformból adat:', this.registrationForm.value);
    this.newUser = this.registrationForm.value;
    this._userService.register(this.newUser).subscribe(
      (data) => this.authResponse = this._userService.getfbAuthResponse().localId,
      (error) => console.log('valami hiba', error)
    );


  }

}
