import { QuestionBase, QuestionI } from './question-base';

export interface AutocompletearrayQuestionI extends QuestionI{
  options?: Array<{value: string, label: string}>;
}
export class AutocompletearrayQuestion extends QuestionBase implements AutocompletearrayQuestionI {
  controlType:"autocompletearray" = "autocompletearray";
  options: Array<{value: string, label: string}> = [];
  constructor(options: AutocompletearrayQuestionI = {}) {
    super(options);
    this.options = options['options'] || [];
  }
  getLabel(value){
    let option = this.options.find(option=>option.value == value);
    return option?option.label:'';
  }
}
