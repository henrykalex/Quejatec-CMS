import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../classes/question-base';
import { InputQuestion } from '../classes/question-input';

import { arraysEqual, objectsEqual, EMAIL_REGEX } from './validate-functions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit, OnChanges {
  state: 'view' | 'edit';
  subscribed = false;
  dataChanged: boolean;
  form: FormGroup = new FormGroup({});

  @Input() questions: any[];
  @Input() baseData: any;

  // Info access
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // View control
  @Input() submitText: string;
  @Input() hideSubmit: boolean;

  @Input() isSending: boolean; // for send button
  @Input() oneCol: boolean;
  @Input() formClass: string;
  @Input() formFieldClass: string;

  constructor() {
    // console.log('FormComponent constructor');
    this.state = 'edit';
    this.oneCol = true;
  }

  ngOnInit() {
    // console.log('FormComponent ngOnInit');
    this.subscribeToChange();
  }

  ngAfterViewInit() {
    // console.log('FormComponent ngAfterViewInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('FormComponent ngOnChanges', changes);
    // console.log('FormComponent ngOnChanges questions', (changes.questions as SimpleChange));
    const questions = changes.questions ? (changes.questions as SimpleChange).currentValue : null;
    const baseData = changes.baseData ? (changes.baseData as SimpleChange).currentValue : null;
    if (questions) {
      this.form = this.createFormGroup(questions);
    }
    if (baseData) {
      this.setValues(baseData);
    }
  }

  public resetForm() {
    this.form.reset({});
  }

  private createFormGroup(questions: QuestionBase[]) {
    // console.log('createFormGroup')
    const group: any = {};

    questions.forEach(question => {
      const tempFC = new FormControl({ value: question.controlType === 'slideToggle' ? false : '', disabled: question.disabled });
      let tempValidator = [];
      if (question.required) { tempValidator.push(Validators.required); }
      if (question instanceof InputQuestion) {
        const questionCasted: InputQuestion = question as InputQuestion;

        switch (questionCasted.type) {
          case 'email':
            tempValidator.push(Validators.pattern(EMAIL_REGEX));
            break;
          case 'password':
            tempValidator.push(Validators.minLength(4));
            break;
          case 'tel':
            tempValidator.push(Validators.minLength(10));
            tempValidator.push(Validators.pattern(/^[0-9.,-]+$/));
            break;
          case 'number':
            tempValidator.push(Validators.pattern('^\\d+$'), Validators.min(0), Validators.max(999999999));
            break;
          case 'currency':
            tempValidator.push(Validators.pattern('^(\\$|)(|\\ )(\\d{1,3}(\\,\\d{3})*|(\\d+))(\\.\\d{2})?$'));
            break;
          case 'url':
            tempValidator.push(Validators.pattern(/^(http|https):\/\/.*/));
            break;
          default:
            break;
        }
      }
      if (question.validators) {
        tempValidator = tempValidator.concat(question.validators);
      }
      tempFC.setValidators(tempValidator);
      group[question.key] = tempFC;
    });
    // console.log('createFormGroup end',group);

    return new FormGroup(group);
  }
  private setValues(values) {
    for (const key of Object.keys(values)) {
      const formControl = this.form.get(key);
      if (formControl) {
        if (Array.isArray(values[key])) {
          formControl.setValue(Object.assign([], values[key]));
        } else {
          formControl.setValue(values[key]);
        }
      }
    }
  }

  private subscribeToChange() {
    // console.log('subscribeToChange');
    this.dataChanged = false;
    if (!this.subscribed) {
      this.form.valueChanges.subscribe(values => {
        // console.log('valueChanges', values);
        this.dataChanged = false;
        let emitValues = null;
        if (this.baseData) {
          // console.log('this.baseData',this.baseData);
          emitValues = {};
          for (const prop of Object.keys(values)) {
            // console.log('prop',prop);
            // console.log('this.baseData[prop]  values[prop]',this.baseData[prop], values[prop],this.baseData[prop]!= values[prop]);
            if (values[prop] || typeof values[prop] === 'boolean') {
              if (
                typeof values[prop] === 'object' ? !objectsEqual(this.baseData[prop], values[prop]) :
                  (this.baseData[prop] !== values[prop])
              ) {
                this.dataChanged = true;
                emitValues[prop] = values[prop];
              }
            }
          }
        }
        // console.log('valueChanges',emitValues);
        this.dataChange.emit(emitValues ? emitValues : values);
        this.validChange.emit(this.form.valid);
      });
    }
    this.subscribed = true;
  }

  submit() {
    const values = this.form.value;
    // console.log('values',values,this.state);
    let emitValues = null;
    if (this.baseData) {
      emitValues = {};
      for (const prop of Object.keys(values)) {
        if (this.baseData[prop]) {
          if (Array.isArray(values[prop]) ? !arraysEqual(this.baseData[prop], values[prop]) : (this.baseData[prop] !== values[prop])) {
            emitValues[prop] = values[prop];
          }
        } else {
          emitValues[prop] = values[prop];
        }
      }
    }
    // console.log('emitValues?emitValues:values',emitValues?emitValues:values);
    this.submitForm.emit(emitValues ? emitValues : values);
  }

}
