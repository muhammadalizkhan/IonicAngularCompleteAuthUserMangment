import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ForgetPasswordPage } from './forget-password/forget-password.page';

@NgModule({
  declarations: [LoginPage, SignupPage, ForgetPasswordPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'signup',
        component: SignupPage,
      },
      {
        path: 'forgot-password',
        component: ForgetPasswordPage,
      },
    ]),
  ],
})
export class AuthenticationModule {}
