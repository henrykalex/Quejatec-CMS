import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app-modules/app-services-module';
import { Router, ActivatedRoute } from '@angular/router';

import { ElementView } from '../../../app-modules/form-module';
import { FilterDef, ColumnDef } from '../../../app-modules/table-module';

import { SPACE_GROUP_QUESTIONS, PARTIAL_SPACE_GROUP_QUESTIONS } from './space-group-questions';
import { SpaceGroupsService } from '../../services/space-groups.service';
import { SpaceService } from '../../services/space.service';

@Component({
  selector: 'app-space-group-view',
  templateUrl: './space-group-view.component.html',
  styleUrls: ['./space-group-view.component.scss']
})
export class SpaceGroupViewComponent extends ElementView implements OnInit {
  statusMap = { active: 'Activo', inactive: 'Desactivado' };

  spaceGroupsFilters: FilterDef[] = [
    { label: 'ACTIVO', value: 'active', field: 'status' },
    { label: 'INACTIVO', value: 'inactive', field: 'status' }
  ];
  spacesColumns: ColumnDef[] = [
    { label: 'Nombre', key: 'name', sort: false },
  ];
  spacesDataFn: any;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected spaceGroupsService: SpaceGroupsService,
    private spaceService: SpaceService,
  ) {
    super(
      appService, router, activatedRoute,
      {
        elementQuestions: SPACE_GROUP_QUESTIONS,
        partialElementQuestions: PARTIAL_SPACE_GROUP_QUESTIONS,
        elementBackRoute: 'space-groups',
        elementNewRoute: 'space-group',

        elementPostServiceFn: spaceGroupsService.createSpaceGroup,
        elementGetServiceFn: spaceGroupsService.getSpaceGroup,
        elementUpdateServiceFn: spaceGroupsService.updateSpaceGroup,
        elementDeleteServiceFn: spaceGroupsService.deleteSpaceGroup,
      }
    );
    this.onElementDataLoad = (elementData) => {
      this.spacesDataFn = this.spaceService.getSpaces(elementData._id);
    };
  }
  ngOnInit() {
  }


  addNewSpace() {
    this.router.navigate(['space'], { relativeTo: this.activatedRoute });
  }

  viewSpace(item) {
    this.router.navigate(['space', item._id], { relativeTo: this.activatedRoute });
  }

}
