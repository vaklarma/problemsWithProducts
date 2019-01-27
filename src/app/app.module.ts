import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {LoginFormComponent} from './user/login-form/login-form.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {AppRoutingModule} from './app-routing.module';
import { RegistrationComponent } from './user/registration/registration.component';
import { RegistrationFormComponent } from './user/registration-form/registration-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    NavbarComponent,
    JumbotronComponent,
    ...AppRoutingModule.routableComponents,
    RegistrationComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
