import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import {
  RequestTableOptions,
  ResponseTableItems,
  getTableHttpParams
} from '../app-modules/table-module';

import {
  HttpErrorHandler,
  HandleError
} from '../app-modules/app-services-module';

import { AppConfig } from '../../app.config';
const apiUrl = AppConfig.apiURL;

@Injectable({
  providedIn: 'root'
})
export class SpaceGroupsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient, private httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('SpaceGroupsService');
  }

  getSpaceGroups = (options: RequestTableOptions) => {
    console.log('getSpaceGroups');
    return this.httpClient.get(`${apiUrl}admin/spaceGroups`, { params: getTableHttpParams(options) }).pipe(
      map((response: any) => {
        console.log('getSpaceGroups response', response);
        return { items: response.items.docs, totalCount: response.items.totalDocs } as ResponseTableItems;
      }),
      catchError(this.handleError('getSpaceGroups', null))
    );
  }

  createSpaceGroup = (spaceGroupData: any) => {
    console.log('createSpaceGroup', spaceGroupData);
    return this.httpClient.post(`${apiUrl}admin/spaceGroup`, spaceGroupData).pipe(
      map((response: any) => {
        console.log('createSpaceGroup response', response);
        return response.item;
      }),
      catchError(this.handleError('createSpaceGroup', null))
    );
  }

  getSpaceGroup = (spaceGroupId: string) => {
    console.log('getSpaceGroup', spaceGroupId);
    return this.httpClient.get(`${apiUrl}admin/spaceGroup/${spaceGroupId}`).pipe(
      map((response: any) => {
        console.log('getSpaceGroup response', response);
        return response.item;
      }),
      catchError(this.handleError('getSpaceGroup', null))
    );
  }

  updateSpaceGroup = (spaceGroupId: string, spaceGroupData: any) => {
    console.log('updateSpaceGroup', spaceGroupData);
    return this.httpClient.patch(`${apiUrl}admin/spaceGroup/${spaceGroupId}`, spaceGroupData).pipe(
      map((response: any) => {
        console.log('updateSpaceGroup response', response);
        return response.item;
      }),
      catchError(this.handleError('updateSpaceGroup', null))
    );
  }

  deleteSpaceGroup = (spaceGroupId: string) => {
    console.log('deleteSpaceGroup', spaceGroupId);
    return this.httpClient.delete(`${apiUrl}admin/spaceGroup/${spaceGroupId}`).pipe(
      map((response: any) => {
        console.log('deleteSpaceGroup response', response);
        return response.success;
      }),
      catchError(this.handleError('deleteSpaceGroup', null))
    );
  }
}
