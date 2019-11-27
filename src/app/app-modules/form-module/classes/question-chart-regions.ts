import { QuestionBase, QuestionI } from './question-base';

export interface ChartRegionsQuestionI extends QuestionI{
}
export class ChartRegionsQuestion extends QuestionBase implements ChartRegionsQuestionI {
  controlType:"chartregions" = "chartregions";
  constructor(options: ChartRegionsQuestionI = {}) {
    super(options);
  }
}
