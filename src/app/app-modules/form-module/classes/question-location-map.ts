import { QuestionBase, QuestionI } from './question-base';
// import { LatLngBoundsLiteral } from '@agm/core';

export type LocationMapType = [number, number];

export interface LocationMapQuestionI extends QuestionI {
  defaultLocation?: LocationMapType;
  // restrictionBounds?: LatLngBoundsLiteral;
}

export class LocationMapQuestion extends QuestionBase implements LocationMapQuestionI {
  controlType: 'locationMap' = 'locationMap';
  defaultLocation: LocationMapType;
  // restrictionBounds: LatLngBoundsLiteral;
  constructor(options: LocationMapQuestionI = {}) {
    super(options);
    this.defaultLocation = options.defaultLocation || [0, 0];
    // this.restrictionBounds = options.restrictionBounds || null;
  }
}
