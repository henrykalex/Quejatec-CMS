import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppDialogComponent } from './app-dialog/app-dialog.component';

@Injectable()
export class AppService {
  loadingDialogRef: MatDialogRef<AppDialogComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }


  showLoadingDialog() {
    if (!this.loadingDialogRef)
      this.loadingDialogRef = this.matDialog.open(AppDialogComponent, {
        disableClose: true,
        data: {
          dialogType: 'loading',
        }
      });
  }

  hideLoadingDialog() {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
      this.loadingDialogRef = null;
    }
  }

  showErrorDialog(errorMessage: string) {
    this.hideLoadingDialog();
    this.matDialog.open(AppDialogComponent, {
      disableClose: true,
      data: {
        dialogType: 'error',
        message: errorMessage
      },

    });
  }

  showMessageDialog(title: string, message: string, action?: (res: boolean) => void) {
    this.hideLoadingDialog();
    this.matDialog.open(AppDialogComponent, {
      disableClose: true,
      data: {
        dialogType: 'message',
        message: message,
        messageTitle: title,
        action: action,
      }
    });
  }
}
