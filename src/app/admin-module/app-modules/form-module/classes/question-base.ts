import { ValidatorFn } from '@angular/forms';

export type QuestionType = 'input' | 'select' | 'textarea' | 'texteditor' | 'textarray' |
  'autocompletearray' | 'imagesUploader' | 'slideToggle' | 'selectarray' | 'recaptcha' |
  'ytvideosarray' | 'chartregions' | 'infoview' | 'locationMap';

export interface QuestionI {
  key?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  order?: number;
  disabled?: boolean;
  controlType?: QuestionType;
  validators?: ValidatorFn[];
}

export class QuestionBase implements QuestionI {
  key: string;
  label: string;
  placeholder?: string;
  required: boolean;
  order: number;
  disabled: boolean;
  controlType: QuestionType;
  validators: ValidatorFn[];
  // TODO: 'autocomplete'|selectradio|slidetoggle|checkbox|slider|Array limit 1
  constructor(options: QuestionI = {}) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.disabled = options.disabled;
    this.controlType = options.controlType || 'input';
    this.validators = options.validators || null;
  }
}
