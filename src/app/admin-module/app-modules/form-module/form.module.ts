import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatAutocompleteModule
 } from '@angular/material/';

import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form-question/form-question.component';

import { TimeSelectComponent } from './time-select/time-select.component';
import { DateSelectComponent } from './date-select/date-select.component';
import { DateTimeSelectComponent } from './date-time-select/date-time-select.component';
import { ChartRegionsComponent } from './chart-regions/chart-regions.component';
import { InputListComponent } from './input-list/input-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  declarations: [
    FormComponent,
    FormQuestionComponent,
    TimeSelectComponent,
    DateSelectComponent,
    DateTimeSelectComponent,
    ChartRegionsComponent,
    InputListComponent,
  ],
  exports: [
    FormComponent,
    FormQuestionComponent,
    TimeSelectComponent,
    DateSelectComponent,
    DateTimeSelectComponent,
    ChartRegionsComponent,
    InputListComponent,
  ]
})
export class FormModule { }
