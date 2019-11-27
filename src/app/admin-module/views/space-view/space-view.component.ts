import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app-modules/app-services-module';
import { Router, ActivatedRoute } from '@angular/router';

// import { ColumnDef } from '../../modules';
import { ElementSubView } from '../../../app-modules/form-module';

import { SPACE_QUESTIONS, PARTIAL_SPACE_QUESTIONS } from './space-questions';
import { SpaceService } from '../../services/space.service';

@Component({
  selector: 'app-space-view',
  templateUrl: './space-view.component.html',
  styleUrls: ['./space-view.component.scss']
})
export class SpaceViewComponent extends ElementSubView implements OnInit {
  statusMap = { active: 'Activo', inactive: 'Inactivo' };

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected spaceService: SpaceService,
  ) {
    super(
      appService, router, activatedRoute,
      {
        elementQuestions: SPACE_QUESTIONS,
        partialElementQuestions: PARTIAL_SPACE_QUESTIONS,
        elementNewRoute: 'space',

        elementPostServiceFn: spaceService.createSpace,
        elementGetServiceFn: spaceService.getSpace,
        elementUpdateServiceFn: spaceService.updateSpace,
        elementDeleteServiceFn: spaceService.deleteSpace,
      }
    );
  }

  ngOnInit() {
  }

}
