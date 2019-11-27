import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app-modules/app-services-module';
import { Router, ActivatedRoute } from '@angular/router';

import { ElementView } from '../../../app-modules/form-module';
import { ColumnDef } from '../../../app-modules/table-module';

import { ADMIN_QUESTIONS, PARTIAL_ADMIN_QUESTIONS } from './admin-questions';
import { AdminsService } from '../../services/admins.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent extends ElementView implements OnInit {
  statusMap = { active: 'Activo', inactive: 'Desactivado' };

  spacesColumns: ColumnDef[] = [
    { label: 'Nombre', key: 'name', sort: false },
  ];
  spacesData: any;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected spaceGroupsService: AdminsService,
  ) {
    super(
      appService, router, activatedRoute,
      {
        elementQuestions: ADMIN_QUESTIONS,
        partialElementQuestions: PARTIAL_ADMIN_QUESTIONS,
        elementBackRoute: 'administradores',
        elementNewRoute: 'administrador',

        elementPostServiceFn: spaceGroupsService.createAdmin,
        elementGetServiceFn: spaceGroupsService.getAdmin,
        elementUpdateServiceFn: spaceGroupsService.updateAdmin,
        elementDeleteServiceFn: spaceGroupsService.deleteAdmin,
      }
    );
  }
  ngOnInit() {
  }

}
