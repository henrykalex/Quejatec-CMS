import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ColumnDef, FilterDef, TableView } from '../../../app-modules/table-module';

import { AdminsService } from '../../services/admins.service';

const ADMINS_COLUMNS: ColumnDef[] = [
  { label: 'Nombre', key: 'name', sort: true }
];
const ADMINS_FILTERS: FilterDef[] = [
  { label: 'ACTIVO', value: 'active', field: 'status' },
  { label: 'INACTIVO', value: 'inactive', field: 'status' }
];

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent extends TableView implements OnInit {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected adminsService: AdminsService,
  ) {
    super(
      router, activatedRoute, {
      columnsDefinition: ADMINS_COLUMNS,
      tableFunction: adminsService.getAdmins,
      routeName: 'administrador',
      filtersDefinition: ADMINS_FILTERS,
    });
  }

  ngOnInit() {
  }

}

