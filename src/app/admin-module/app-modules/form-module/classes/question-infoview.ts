import { QuestionBase, QuestionI } from './question-base';


export interface InfoViewQuestionI extends QuestionI {
  isLink?: boolean;
  route?: string[];
  pipe?: string;
}

export class InfoViewQuestion extends QuestionBase {
  controlType: 'infoview' = 'infoview';
  isLink: boolean;
  route: string[];
  pipe: string;

  constructor(options: InfoViewQuestionI = {}) {
    super(options);
    this.isLink = options.isLink || false;
    this.route = options.route || null;
    this.pipe = options.pipe || null;
  }
}
