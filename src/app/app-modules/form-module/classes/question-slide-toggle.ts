import { QuestionBase, QuestionI } from './question-base';

export interface SlideToggleQuestionI extends QuestionI{
}

export class SlideToggleQuestion extends QuestionBase implements SlideToggleQuestionI {
  controlType:"slideToggle" = "slideToggle";
  constructor(options: SlideToggleQuestionI = {}) {
    super(options);
  }
}
