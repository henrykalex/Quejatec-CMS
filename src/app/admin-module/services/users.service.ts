import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import {
  RequestTableOptions,
  ResponseTableItems,
  getTableHttpParams
} from '../../app-modules/table-module';

import {
  HttpErrorHandler,
  HandleError
} from '../../app-modules/app-services-module';

import { AppConfig } from '../../app.config';
const apiUrl = AppConfig.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('UsersService');
  }

  getUsers = (options: RequestTableOptions) => {
    console.log('getUsers');
    return this.httpClient.get(`${apiUrl}admin/user`, { params: getTableHttpParams(options) }).pipe(
      map((response: any) => {
        console.log('getUsers response', response);
        return { items: response.users, totalCount: response.total } as ResponseTableItems;
      }),
      catchError(this.handleError('getUsers', null))
    );
  }

  createUser = (userData: any) => {
    console.log('createUser', userData);
    return this.httpClient.post(`${apiUrl}admin/user`, userData).pipe(
      map((response: any) => {
        console.log('createUser response', response);
        return response.item;
      }),
      catchError(this.handleError('createUser', null))
    );
  }

  getUser = (userId: string) => {
    console.log('getUser', userId);
    return this.httpClient.get(`${apiUrl}admin/user/${userId}`).pipe(
      map((response: any) => {
        console.log('getUser response', response);
        return response.item;
      }),
      catchError(this.handleError('getUser', null))
    );
  }

  updateUser = (userId: string, userData: any) => {
    console.log('updateUser', userData);
    return this.httpClient.patch(`${apiUrl}admin/user/${userId}`, userData).pipe(
      map((response: any) => {
        console.log('updateUser response', response);
        return response.item;
      }),
      catchError(this.handleError('updateUser', null))
    );
  }

  deleteUser = (userId: string) => {
    console.log('deleteUser', userId);
    return this.httpClient.delete(`${apiUrl}admin/user/${userId}`).pipe(
      map((response: any) => {
        console.log('deleteUser response', response);
        return response.success;
      }),
      catchError(this.handleError('deleteUser', null))
    );
  }
}
