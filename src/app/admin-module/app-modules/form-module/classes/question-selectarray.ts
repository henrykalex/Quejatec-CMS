import { QuestionBase, QuestionI } from './question-base';

export interface SelectarrayQuestionI extends QuestionI{
  options?: {value: string, label: string}[];
}
export class SelectarrayQuestion extends QuestionBase implements SelectarrayQuestionI {
  controlType:"selectarray" = "selectarray";
  options: {value: string, label: string}[] = [];
  constructor(options: SelectarrayQuestionI = {}) {
    super(options);
    this.options = options['options'] || [];
  }
  getLabel(value){
    let option = this.options.find(option=>option.value == value);
    return option?option.label:'';
  }
}
