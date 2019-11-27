import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../classes/question-base';
import { InfoViewQuestion } from '../classes/question-infoview';
import { InputQuestion } from '../classes/question-input';
import { SelectQuestion } from '../classes/question-select';
import { LocationMapQuestion } from '../classes/question-location-map';
import { TextareaQuestion } from '../classes/question-textarea';
import { TexteditorQuestion } from '../classes/question-texteditor';
import { TextarrayQuestion } from '../classes/question-textarray';
import { AutocompletearrayQuestion } from '../classes/question-autocompletearray';
import { ImagesUploaderQuestion } from '../classes/question-images-uploader';
import { SlideToggleQuestion } from '../classes/question-slide-toggle';
import { SelectarrayQuestion } from '../classes/question-selectarray';
import { RecaptchaQuestion } from '../classes/question-recaptcha';
import { YtvideosarrayQuestion } from '../classes/question-ytvideosarray';
import { ChartRegionsQuestion } from '../classes/question-chart-regions';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormQuestionComponent implements OnInit {
  @Input() question: any;

  @Input() form: FormGroup;
  @Input() state: 'view'|'edit';
  @Input() formFieldClass: string;
  get isValid() { return this.form.controls[this.question.key].valid; }
  get value() { return this.form.controls[this.question.key].value; }
  get routeLink() {
    const temp = Object.assign([], (this.question as InfoViewQuestion).route);
    if (this.value) {
      temp.push(this.value);
    }
    return temp;
  }
  constructor() { }

  ngOnInit() {
  }

  getQuestionType() {
    return (this.question as InputQuestion).type;
  }

  getOptions() {
    return (this.question as SelectQuestion).options;
  }
  getDefaultLocation() {
    return (this.question as LocationMapQuestion).defaultLocation;
  }

}
