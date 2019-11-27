import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { LocalStorage } from 'ngx-webstorage';
import { Observable, BehaviorSubject, ReplaySubject, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../app-modules/app-services-module/http-error-handler.service';

import { AppConfig } from '../app.config';
const apiUrl = AppConfig.apiURL;

export type UserType = 'admin' | 'restaurant';

const NULL_RESPONSE: AuthResponse = {
  success: false,
  token: null,
  type: null,
  userData: null
};

export interface AuthResponse {
  success: boolean;
  token: string;
  type: UserType;
  userData: { _id: string, name: string, email: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private handleError: HandleError;

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoggedInPriv = false;
  // @LocalStorage('token')
  public token: string;

  // @LocalStorage('userType')
  userType: UserType;
  // @LocalStorage('name')
  name: string;

  public get isLoggedInObsevable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  public get isLoggedIn() {
    return (this.isLoggedInPriv && (this.token !== undefined));
  }
  public set isLoggedIn(value: boolean) { this.isLoggedInPriv = value; }

  private userInfoPriv: ReplaySubject<any> = new ReplaySubject(1);
  public get userInfo(): Observable<any> { return this.userInfoPriv.asObservable(); }

  constructor(
    private http: HttpClient, private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AuthService');
  }


  login(userCredentials: any, userType: UserType) {
    // console.log('login', userType)
    return this.http.post(`${apiUrl}${userType}/login`, userCredentials).pipe(
      map((response: any) => {
        if (!AppConfig.isProduction) {
          console.log('login response', response);
        }
        return this.setLoginStatus(response);
      }),
      catchError(this.handleError('login', null))
    );
  }
  forgotPassword(userCredentialas: any, userType: UserType) {
    console.log('forgotPassword', userCredentialas);
    return this.http.post(`${apiUrl}${userType}/forgot-password`, userCredentialas).pipe(
      map((response: AuthResponse) => {
        if (!AppConfig.isProduction) {
          console.log('forgotPassword response', response);
        }
        return response.success;
      }),
      catchError(this.handleError('forgotPassword', null))
    );
  }

  logOut() {
    return this.setLoginStatus(NULL_RESPONSE);
  }
  isLoggedInServer(userType: UserType) {
    if (!AppConfig.isProduction) {
      console.log('isLoggedInServer ', userType, this.token);
    }
    if (this.token) {
      return this.http.get(`${apiUrl}${userType}/is-logged-in`)
        .pipe(
          map((response: AuthResponse) => {
            console.log('isLoggedInServer response', response);
            return this.setLoginStatus(response);
          })
        );
    } else {
      return from([this.setLoginStatus(NULL_RESPONSE)]);
    }
  }

  private setLoginStatus(response: AuthResponse): any {
    this.isLoggedIn = response.success ? true : false;
    this.userType = response.success ? response.type : null;
    this.name = response.success ? response.userData.name : null;
    this.token = response.token;
    this.isLoggedInSubject.next(this.isLoggedInPriv);
    if (!AppConfig.isProduction) {
      console.log('setLoginStatus', this.isLoggedIn, this.name);
    }
    this.userInfoPriv.next({ name: this.name, userType: this.userType });
    return this.isLoggedIn;
  }
}
