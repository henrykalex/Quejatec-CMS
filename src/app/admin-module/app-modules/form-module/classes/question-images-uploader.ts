import { QuestionBase, QuestionI } from './question-base';
import { Observable } from 'rxjs';

export interface ImagesUploaderQuestionI extends QuestionI{
  maxFiles?: number;
  uploadUrl?: string;
  signatureFunction?: ()=>Observable<any>;
}

export class ImagesUploaderQuestion extends QuestionBase implements ImagesUploaderQuestionI {
  controlType:"imagesUploader" = "imagesUploader";
  maxFiles: number;
  uploadUrl: string;
  signatureFunction: ()=>Observable<any>;
  constructor(options: ImagesUploaderQuestionI = {}) {
    super(options);
    this.maxFiles = options.maxFiles || 1;

  }
}
