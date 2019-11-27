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
export class AdminsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AdminsService');
  }

  getAllAdmins = () => {
    console.log('getAllAdmins');
    return this.httpClient.get(`${apiUrl}admin/admin/all`).pipe(
      map((response: any) => {
        console.log('getAllAdmins response', response);
        return response.items;
      }),
      catchError(this.handleError('getAllAdmins', null))
    );
  }

  getAdmins = (options: RequestTableOptions) => {
    console.log('getAdmins');
    return this.httpClient.get(`${apiUrl}admin/admin`, { params: getTableHttpParams(options) }).pipe(
      map((response: any) => {
        console.log('getAdmins response', response);
        return { items: response.admins, totalCount: response.total } as ResponseTableItems;
      }),
      catchError(this.handleError('getAdmins', null))
    );
  }

  createAdmin = (adminData: any) => {
    console.log('createAdmin', adminData);
    return this.httpClient.post(`${apiUrl}admin/admin`, adminData).pipe(
      map((response: any) => {
        console.log('createAdmin response', response);
        return response.admin;
      }),
      catchError(this.handleError('createAdmin', null))
    );
  }

  getAdmin = (adminId: string) => {
    console.log('getAdmin', adminId);
    return this.httpClient.get(`${apiUrl}admin/admin/${adminId}`).pipe(
      map((response: any) => {
        console.log('getAdmin response', response);
        return response.admin;
      }),
      catchError(this.handleError('getAdmin', null))
    );
  }

  updateAdmin = (adminId: string, adminData: any) => {
    console.log('updateAdmin', adminData);
    return this.httpClient.patch(`${apiUrl}admin/admin/${adminId}`, adminData).pipe(
      map((response: any) => {
        console.log('updateAdmin response', response);
        return response.admin;
      }),
      catchError(this.handleError('updateAdmin', null))
    );
  }

  deleteAdmin = (adminId: string) => {
    console.log('deleteAdmin', adminId);
    return this.httpClient.delete(`${apiUrl}admin/admin/${adminId}`).pipe(
      map((response: any) => {
        console.log('deleteAdmin response', response);
        return response.success;
      }),
      catchError(this.handleError('deleteAdmin', null))
    );
  }
}
