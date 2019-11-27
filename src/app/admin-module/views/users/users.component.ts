import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ColumnDef, FilterDef, TableView } from '../../../app-modules/table-module';

import { UsersService } from '../../services/users.service';

const USERS_COLUMNS: ColumnDef[] = [
  { label: 'Nombre', key: 'name', sort: true }
];
const USERS_FILTERS: FilterDef[] = [
  { label: 'ACTIVO', value: 'active', field: 'status' },
  { label: 'INACTIVO', value: 'inactive', field: 'status' }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends TableView implements OnInit {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected usersService: UsersService,
  ) {
    super(
      router, activatedRoute, {
      columnsDefinition: USERS_COLUMNS,
      tableFunction: usersService.getUsers,
      routeName: 'user',
      filtersDefinition: USERS_FILTERS,
    });
  }

  ngOnInit() {
  }

}

