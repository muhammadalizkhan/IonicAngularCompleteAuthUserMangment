import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['alikhan7847@gmail.com', Validators.required],
    passoword: ['12345', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private loadingController: LoadingController,
    private router: Router

  ) { }

  ngOnInit() {
  }

}
