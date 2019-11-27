import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad, Route
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService, UserType } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    // console.log("canActivate url",url);
    return this.checkLocalLogin(/admin/.exec(url)?'admin':'restaurant');
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    let type = route.path;
    // console.log("canLoad type",type);
    return this.checkLogin(/admin/.exec(type)?'admin':'restaurant');
  }

  checkLogin(type: UserType): Observable<boolean> {
    // console.log("checkLogin type",type);
    return this.authService.isLoggedInServer(type).pipe(
      map((res:boolean)=>{
        if(!res) this.router.navigate(['iniciar']);
        return res;
      }),
      catchError((error)=>{
        console.log("error",error);
        this.router.navigate(['iniciar']);
        return of(false);
      })
    );

  }
  checkLocalLogin(type: UserType):boolean{
    // console.log("checkLocalLogin type",type);
    return !!this.authService.isLoggedIn &&
    !!this.authService.token &&
    !!this.authService.userType &&
    !!this.authService.name &&
    this.authService.userType == type;
  }

}
