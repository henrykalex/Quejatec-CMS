import {
  InputQuestion, SelectQuestion
} from '../../../app-modules/form-module';
import { Validators } from '@angular/forms';
/* name: String,
	lastname: String,
	email: String,
  role: ‘master’ | ‘admin’,
*/

export const PARTIAL_ADMIN_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    order: 1,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)]
  }),
  new InputQuestion({
    key: 'lastname',
    type: 'text',
    label: 'Apellido',
    required: true,
    order: 1,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)]
  }),
  new InputQuestion({
    key: 'email',
    type: 'email',
    label: 'Correo',
    required: true,
    order: 1,
  }),
];
export const ADMIN_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)],
    order: 1,
  }),
  new InputQuestion({
    key: 'lastname',
    type: 'text',
    label: 'Apellido',
    required: true,
    order: 1,
    validators: [Validators.pattern(/^[aA-zZáéíóúüñÁÉÍÓÚÜÑ][aA-zZ\sáéíóúüñÁÉÍÓÚÜÑ]*/)]
  }),
  new InputQuestion({
    key: 'email',
    type: 'email',
    label: 'Correo',
    required: true,
    order: 1,
  }),
  new SelectQuestion({
    key: 'type',
    options: [
      {label: 'Master', value: 'master'},
      {label: 'Admin', value: 'admin'}
    ],
    label: 'Tipo',
    required: true,
    order: 1,
  }),
];
