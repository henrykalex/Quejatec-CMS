import { QuestionBase, QuestionI } from './question-base';

export interface RecaptchaQuestionI extends QuestionI{
}

export class RecaptchaQuestion extends QuestionBase implements RecaptchaQuestionI {
  controlType:"recaptcha" = "recaptcha";
  constructor(options: RecaptchaQuestionI = {}) {
    super(options);
  }
}
