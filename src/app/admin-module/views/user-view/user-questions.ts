import {
  InfoViewQuestion,
} from '../../../app-modules/form-module';
/* name: String,
	lastname: String,
	email: String,
*/

export const PARTIAL_USER_QUESTIONS = [
  new InfoViewQuestion({
    key: 'name',
    label: 'Nombre',
    required: true,
    order: 1,
  }),
  new InfoViewQuestion({
    key: 'lastname',
    label: 'Apellido',
    required: true,
    order: 1,
  }),
  new InfoViewQuestion({
    key: 'email',
    label: 'Correo',
    required: true,
    order: 1,
  }),
];
export const USER_QUESTIONS = [
  new InfoViewQuestion({
    key: 'name',
    label: 'Nombre',
    required: true,
    order: 1,
  }),
  new InfoViewQuestion({
    key: 'lastname',
    label: 'Apellido',
    required: true,
    order: 1,
  }),
  new InfoViewQuestion({
    key: 'email',
    label: 'Correo',
    required: true,
    order: 1,
  })
];
