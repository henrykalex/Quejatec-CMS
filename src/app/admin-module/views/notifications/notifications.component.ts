import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ColumnDef, FilterDef, TableView } from '../../../app-modules/table-module';

import { NotificationsService } from '../../services/notifications.service';

const COMPLAINS_COLUMNS: ColumnDef[] = [
  { label: 'Fecha', key: 'registerDate', sort: true },
  { label: 'Mensaje', key: 'message', sort: true }
];


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends TableView implements OnInit {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected notificationsService: NotificationsService,
  ) {
    super(
      router, activatedRoute, {
      columnsDefinition: COMPLAINS_COLUMNS,
      tableFunction: notificationsService.getNotifications,
      routeName: '',
      filtersDefinition: null,
    });
  }

  ngOnInit() {
  }

  deleteItem(notification) {
    console.log('deleteItem', notification);
  }

}
