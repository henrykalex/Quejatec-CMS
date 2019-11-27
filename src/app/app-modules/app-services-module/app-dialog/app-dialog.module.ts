import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';
import { AppDialogComponent } from './app-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [AppDialogComponent],
  entryComponents: [AppDialogComponent],
  exports: [AppDialogComponent]
})
export class AppDialogModule { }
