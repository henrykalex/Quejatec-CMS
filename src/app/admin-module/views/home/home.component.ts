import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { FormControl } from '@angular/forms';

import { DUMMY_DATA } from './dummy-data';
import { SpaceGroupsService } from '../../services/space-groups.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  curve = shape.curveLinear;

  complainsData: any[] = DUMMY_DATA;
  groups: any[] = null;
  groupControl: FormControl = new FormControl();

  constructor(
    private spaceGroupsService: SpaceGroupsService,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.spaceGroupsService.getAllSpaceGroups().subscribe(groups => {
      if (groups) {
        this.groups = groups;
        this.groupControl.setValue(groups[0]._id);
      }
    });
    this.groupControl.valueChanges.subscribe(value => {
      if (value) {
        console.log('value', value);
        this.getStats(value);
      }
    });
  }

  getStats(groupId) {
    this.homeService.getHomeStats(groupId).subscribe(stats => {
      if (stats) {
        this.complainsData = stats;
      }
    });
  }

}
