import { QuestionBase, QuestionI } from './question-base';

export interface TextareaQuestionI extends QuestionI{
}
export class TextareaQuestion extends QuestionBase implements TextareaQuestionI {
  controlType:"textarea" = "textarea";
  constructor(options: TextareaQuestionI = {}) {
    super(options);
  }
}
