import { QuestionBase, QuestionI } from './question-base';

export interface SelectQuestionI extends QuestionI{
  options?: {value: string, label: string}[];
}

export class SelectQuestion extends QuestionBase implements SelectQuestionI{
  controlType:'select' = 'select';
  options: {value: string, label: string}[] = [];

  constructor(options: SelectQuestionI = {}) {
    super(options);
    this.options = options['options'] || [];
  }

  getLabel(value){
    let option = this.options.find(option=>option.value == value);
    return option?option.label:'';
  }
}
