import { QuestionBase, QuestionI } from './question-base';

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'number' |
  'currency' | 'url' | 'date' | 'datetime' | 'time';

export interface InputQuestionI extends QuestionI {
  type?: InputType;
}

export class InputQuestion extends QuestionBase implements InputQuestionI {
  controlType: 'input' = 'input';
  type: InputType;
  constructor(options: InputQuestionI = {}) {
    super(options);
    this.type = options.type || 'text';

  }
}
