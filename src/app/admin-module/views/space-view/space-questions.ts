import { InputQuestion, SelectQuestion } from '../../../app-modules/form-module';

export const PARTIAL_SPACE_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre del producto',
    required: true,
    order: 1,
  }),
  new SelectQuestion({
    key: 'type',
    label: 'Tipo',
    options: [
      {label: 'Espacio', value: 'place'},
      {label: 'Evento', value: 'event'}
    ],
    required: true,
    order: 1,
  }),
  new InputQuestion({
    key: 'dueDate',
    type: 'datetime',
    label: 'Fecha de realización (evento)',
    order: 1,
  }),
];
export const SPACE_QUESTIONS = [
  new InputQuestion({
    key: 'name',
    type: 'text',
    label: 'Nombre del producto',
    required: true,
    order: 1,
  }),
  new SelectQuestion({
    key: 'type',
    label: 'Tipo',
    options: [
      {label: 'Espacio', value: 'place'},
      {label: 'Evento', value: 'event'}
    ],
    required: true,
    order: 1,
  }),
  new InputQuestion({
    key: 'dueDate',
    type: 'datetime',
    label: 'Fecha de realización (evento)',
    order: 1,
  }),
];
