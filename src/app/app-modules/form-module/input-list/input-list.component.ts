import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { QuestionBase } from '../classes/question-base';
import { SelectarrayQuestion } from '../classes/question-selectarray';

export function createArrayLengthValidator() {
  return (c: FormControl) => {
    const err = {
      lengthError: {
        given: c.value.length,
      }
    };
    if (c.value.length < 0) {
      return err;
    }
    if (c.value.length >= 1) {
      for (const val of c.value) {
        if (!val) {
          return err;
        }
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputListComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputListComponent), multi: true }
  ]
})
export class InputListComponent implements OnInit, OnChanges, ControlValueAccessor {
  questionPriv: any;
  @Input() set question(value: any) {
    this.questionPriv = value;
    if (value.controlType === 'selectarray') {
      this.questionOptions = Object.assign([], (value as SelectarrayQuestion).options);
    }
  }
  get question(): any {
    return this.questionPriv;
  }

  questionOptions: { value: string, label: string }[];

  elementsListPriv: any[] = [];
  get elementsList() {
    return this.elementsListPriv;
  }

  set elementsList(val) {
    this.elementsListPriv = val;
    this.propagateChange(val);
    if (this.question.controlType === 'selectarray') {
      this.returnOption();
    }
  }

  propagateChange: any = () => { };
  validateFn: any = () => { };
  constructor() {
    // DEBUG:
    // this.elementsList = ['Tag1','Tag2','Tag3'];
  }

  ngOnInit() {
    this.validateFn = createArrayLengthValidator();
  }

  ///// Custom formControl
  ngOnChanges(inputs) {
    if (inputs.length) {
      this.validateFn = createArrayLengthValidator();
      this.propagateChange(this.elementsList);
    }
    // if (inputs.counterRangeMax || inputs.counterRangeMin) {
    //   this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    //   this.propagateChange(this.counterValue);
    // }
  }

  writeValue(value) {
    if (value) {
      this.elementsList = this.copy(value);
    }
  }

  copy(o) {
    let output;
    let v;
    let key;
    output = Array.isArray(o) ? [] : {};
    for (key of Object.keys(o)) {
      v = o[key];
      output[key] = (typeof v === 'object') ? this.copy(v) : v;
    }
    return output;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
  ////////

  trackByIdx(index: number, obj: any): any {
    return index;
  }
  addNewElement() {
    this.elementsList.push('');
    this.elementsList = this.elementsList;
  }
  elementChange(change, index) {
    // console.log('elementChange',change,index);
    this.elementsList[index] = change;
    this.elementsList = this.elementsList;
    if (this.question.controlType === 'selectarray') {
      this.removeOption(change);
    }
  }
  removeElement(index) {
    this.elementsList.splice(index, 1);
    this.elementsList = this.elementsList;
    if (this.question.controlType === 'selectarray') {
      this.returnOption();
    }
  }

  // controlType==='selectarray' properties
  removeOption(value) {
    const optIndex = this.questionOptions.findIndex(option => option.value === value);
    this.questionOptions.splice(optIndex, 1);
  }
  returnOption() {
    this.questionOptions = Object.assign([], (this.question as SelectarrayQuestion).options);
    this.elementsList.forEach(element => {
      const optionIndex = this.questionOptions.findIndex(opt => opt.value === element);
      if (optionIndex !== -1) {
        this.questionOptions.splice(optionIndex, 1);
      }
    });
  }
}
