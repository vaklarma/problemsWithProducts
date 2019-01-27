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
  newUser : UserModel;

  constructor(private fb: FormBuilder,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required],
        name: [null, Validators.required],
        repeatPassword: [null, Validators.required],
        profilePicUrl: ['default pic url', Validators.required],

      }
    );
  }
  onSubmit() {
    console.log('A regformból adat:', this.form.value);
    this.newUser = this.form.value;
    this._userService.setNewUser(this.newUser);
    console.log('Az új user neve', this._userService.getAllUser().name);

  }

}
