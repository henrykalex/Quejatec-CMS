import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app-modules/app-services-module';
import { Router, ActivatedRoute } from '@angular/router';

import { ElementView } from '../../../app-modules/form-module';
import { ColumnDef } from '../../../app-modules/table-module';

import { USER_QUESTIONS, PARTIAL_USER_QUESTIONS } from './user-questions';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends ElementView implements OnInit {
  statusMap = { active: 'Activo', inactive: 'Desactivado' };

  spacesColumns: ColumnDef[] = [
    { label: 'Nombre', key: 'name', sort: false },
  ];
  spacesData: any;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected spaceGroupsService: UsersService,
  ) {
    super(
      appService, router, activatedRoute,
      {
        elementQuestions: USER_QUESTIONS,
        partialElementQuestions: PARTIAL_USER_QUESTIONS,
        elementBackRoute: 'users',
        elementNewRoute: 'user',

        elementPostServiceFn: spaceGroupsService.createUser,
        elementGetServiceFn: spaceGroupsService.getUser,
        elementUpdateServiceFn: spaceGroupsService.updateUser,
        elementDeleteServiceFn: spaceGroupsService.deleteUser,
      }
    );
  }
  ngOnInit() {
  }

}

