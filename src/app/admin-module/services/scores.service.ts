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
export class ScoresService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ScoresService');
  }

  getScoreStats = (groupId: string) => {
    console.log('getScoreStats');
    return this.httpClient.get(`${apiUrl}admin/net-promoter-score/stats/${groupId}`).pipe(
      map((response: any) => {
        console.log('getScoreStats response', response);
        return response.items;
      }),
      catchError(this.handleError('getScoreStats', null))
    );
  }
}
