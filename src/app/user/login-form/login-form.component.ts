import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginError = false;

  constructor(public userService: UserService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ['default3@valami.hu', Validators.required],
        password: ['gabiildi', Validators.required]
      }
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
        (data) => console.log('Loginból siceres subscribe: ', data),
        (error) => {
          console.log('hiba A BELÉPÉSNÉL: ', error.message);
          this.loginError = true;
        }
      );
    } else {
      return;
   //   this.loginError = true;
    }
  }
}
