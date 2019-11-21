import { QuestionBase, QuestionI } from './question-base';

export interface TexteditorQuestionI extends QuestionI{
}
export class TexteditorQuestion extends QuestionBase implements TexteditorQuestionI {
  controlType:"texteditor" = "texteditor";
  constructor(options: TexteditorQuestionI = {}) {
    super(options);
  }
}
