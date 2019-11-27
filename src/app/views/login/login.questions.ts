import { InputQuestion } from '../../app-modules/form-module';

export const LOGIN_QUESTIONS = [
  new InputQuestion({
    key: 'email',
    type: 'email',
    label: 'Correo',
    required: true,
    order: 1,
  }),
  new InputQuestion({
    key: 'password',
    type: 'password',
    label: 'Contraseña',
    required: true,
    order: 1,
  })
];
