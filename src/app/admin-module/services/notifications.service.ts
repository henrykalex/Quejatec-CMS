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
export class NotificationsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('NotificationsService');
  }

  getNotifications = (options: RequestTableOptions) => {
    console.log('getNotifications');
    return this.httpClient.get(`${apiUrl}admin/notification`, { params: getTableHttpParams(options) }).pipe(
      map((response: any) => {
        console.log('getNotifications response', response);
        return { items: response.notifications, totalCount: response.total } as ResponseTableItems;
      }),
      catchError(this.handleError('getNotifications', null))
    );
  }
}
