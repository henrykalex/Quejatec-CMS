import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DUMMY_DATA } from './dummy-data';
import { SpaceGroupsService } from '../../services/space-groups.service';
import { ScoresService } from '../../services/scores.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scoresData: any[] = DUMMY_DATA;
  groups: any[] = null;
  groupControl: FormControl = new FormControl();

  constructor(
    private spaceGroupsService: SpaceGroupsService,
    private scoresService: ScoresService
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
    this.scoresService.getScoreStats(groupId).subscribe(stats => {
      if (stats) {
        this.scoresData = stats;
      }
    });
  }

}
