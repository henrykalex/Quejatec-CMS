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
export class ComplainsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ComplainsService');
  }

  getComplains = (options: RequestTableOptions) => {
    console.log('getComplains');
    return this.httpClient.get(`${apiUrl}admin/issue`, { params: getTableHttpParams(options) }).pipe(
      map((response: any) => {
        console.log('getComplains response', response);
        return { items: response.issues, totalCount: response.total } as ResponseTableItems;
      }),
      catchError(this.handleError('getComplains', null))
    );
  }

  createComplain = (complainData: any) => {
    console.log('createComplain', complainData);
    return this.httpClient.post(`${apiUrl}admin/issue`, complainData).pipe(
      map((response: any) => {
        console.log('createComplain response', response);
        return response.item;
      }),
      catchError(this.handleError('createComplain', null))
    );
  }

  getComplain = (complainId: string) => {
    console.log('getComplain', complainId);
    return this.httpClient.get(`${apiUrl}admin/issue/${complainId}`).pipe(
      map((response: any) => {
        console.log('getComplain response', response);
        return response.item;
      }),
      catchError(this.handleError('getComplain', null))
    );
  }

  updateComplain = (complainId: string, complainData: any) => {
    console.log('updateComplain', complainData);
    return this.httpClient.patch(`${apiUrl}admin/issue/${complainId}`, complainData).pipe(
      map((response: any) => {
        console.log('updateComplain response', response);
        return response.item;
      }),
      catchError(this.handleError('updateComplain', null))
    );
  }

  deleteComplain = (complainId: string) => {
    console.log('deleteComplain', complainId);
    return this.httpClient.delete(`${apiUrl}admin/issue/${complainId}`).pipe(
      map((response: any) => {
        console.log('deleteComplain response', response);
        return response.success;
      }),
      catchError(this.handleError('deleteComplain', null))
    );
  }
}
