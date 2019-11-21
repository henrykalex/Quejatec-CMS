import { QuestionBase, QuestionI } from './question-base';

export interface TextarrayQuestionI extends QuestionI{
}
export class TextarrayQuestion extends QuestionBase implements TextarrayQuestionI {
  controlType:"textarray" = "textarray";
  constructor(options: TextarrayQuestionI = {}) {
    super(options);
  }
  getLabel(value) {
    return '';
  }
}
