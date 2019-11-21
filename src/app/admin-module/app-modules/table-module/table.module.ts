import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatPaginatorIntl,
} from '@angular/material/';

import { TableComponent } from './table/table.component';

import { MatPaginatorIntlEs } from './table-labels.provider';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  declarations: [
    TableComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEs }
  ],
  exports: [
    TableComponent,
  ],
})
export class TableModule { }
