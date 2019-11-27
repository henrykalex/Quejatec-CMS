import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ColumnDef, FilterDef, TableView } from '../../../app-modules/table-module';

import { ComplainsService } from '../../services/complains.service';

const COMPLAINS_COLUMNS: ColumnDef[] = [
  { label: 'Fecha', key: 'registerDate', sort: true }
];
const COMPLAINS_FILTERS: FilterDef[] = [
  { label: 'ACTIVE', value: 'open', field: 'status' },
  { label: 'ASIGNADA', value: 'assigned', field: 'status' },
  { label: 'REVISADA', value: 'viewed', field: 'status' },
  { label: 'EN PROCESO', value: 'in-process', field: 'status' },
  { label: 'RECHAZADA', value: 'rejected', field: 'status' },
  { label: 'CERRADA', value: 'closed', field: 'status' }
];

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent extends TableView implements OnInit {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected complainsService: ComplainsService,
  ) {
    super(
      router, activatedRoute, {
      columnsDefinition: COMPLAINS_COLUMNS,
      tableFunction: complainsService.getComplains,
      routeName: 'queja',
      filtersDefinition: COMPLAINS_FILTERS,
    });
  }

  ngOnInit() {
  }

}

