import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService, WindowRefService } from '../../app-modules/app-services-module';
import { AuthService } from '../../auth/auth.service';

import { LOGIN_QUESTIONS } from './login.questions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginQuestions: any[] = LOGIN_QUESTIONS;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private appService: AppService,
    private windowRefService: WindowRefService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    const adminRegexp: RegExp = /admin/;
    this.isAdmin = !!adminRegexp.exec(this.router.url) ||
      !!adminRegexp.exec(this.windowRefService.nativeWindow.location.hostname);
  }

  login(event) {
    this.appService.showLoadingDialog();
    console.log('login', event);
    // this.authService.login(event, this.isAdmin ? 'admin' : 'restaurant').subscribe((response: any) => {
    //   // console.log('login response',response);
    //   if (response) {
    //     this.router.navigate(this.isAdmin ? ['/admin'] : ['/restaurante']);
    //     this.appService.hideLoadingDialog();
    //   }
    // });
    setTimeout(() => {
        this.router.navigate(['/admin']);
        this.appService.hideLoadingDialog();
    }, 600);
  }
}
