import { QuestionBase, QuestionI } from './question-base';

export interface YtvideosarrayQuestionI extends QuestionI{
}
export class YtvideosarrayQuestion extends QuestionBase implements YtvideosarrayQuestionI {
  controlType:"ytvideosarray" = "ytvideosarray";
  constructor(options: YtvideosarrayQuestionI = {}) {
    super(options);
  }
  getLabel(value) {
    return '';
  }
}
