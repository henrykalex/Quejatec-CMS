import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import {
  HttpErrorHandler,
  HandleError
} from '../../app-modules/app-services-module';

import { AppConfig } from '../../app.config';
const apiUrl = AppConfig.apiURL;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('HomeService');
  }

  getHomeStats = (groupId: string) => {
    console.log('getHomeStats');
    return this.httpClient.get(`${apiUrl}admin/home/stats/${groupId}`).pipe(
      map((response: any) => {
        console.log('getHomeStats response', response);
        return response.items;
      }),
      catchError(this.handleError('getHomeStats', null))
    );
  }
}
