import {
  InputQuestion
} from '../../../app-modules/form-module';
import { Validators } from '@angular/forms';

export const PARTIAL_SPACE_GROUP_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre del grupo',
    required: true,
    order: 1,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)]
  }),
];
export const SPACE_GROUP_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre del grupo',
    required: true,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)],
    order: 1,
  }),
];
