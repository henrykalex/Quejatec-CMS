import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ColumnDef, FilterDef, TableView } from '../../../app-modules/table-module';

import { SpaceGroupsService } from '../../services/space-groups.service';

const SPACE_GROUPS_COLUMNS: ColumnDef[] = [
  { label: 'Nombre', key: 'name', sort: true }
];
const SPACE_GROUPS_FILTERS: FilterDef[] = [
  { label: 'ACTIVE', value: 'active', field: 'status' },
  { label: 'INACTIVE', value: 'inactive', field: 'status' }
];
@Component({
  selector: 'app-space-groups',
  templateUrl: './space-groups.component.html',
  styleUrls: ['./space-groups.component.scss']
})
export class SpaceGroupsComponent extends TableView implements OnInit {

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected spaceGroupsService: SpaceGroupsService,
  ) {
    super(
      router, activatedRoute, {
      columnsDefinition: SPACE_GROUPS_COLUMNS,
      tableFunction: spaceGroupsService.getSpaceGroups,
      routeName: 'space-group',
      filtersDefinition: SPACE_GROUPS_FILTERS,
    });
  }

  ngOnInit() {
  }

}
