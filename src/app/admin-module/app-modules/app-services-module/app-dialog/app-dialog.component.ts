import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export type AppDialogType = 'loading'|'error'|'message';

export interface AppDialogData{
  dialogType: AppDialogType;
  message: string;
  messageTitle?: string;
  okButton?: string;
  cancelButton?: string;
  action?: (res:boolean)=>void;
}


@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {
  dialogType: AppDialogType = 'loading';
  message: string;
  messageTitle: string;
  okButton?: string;
  cancelButton?: string;
  constructor(
    public dialogRef: MatDialogRef<AppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppDialogData
  ) {
    this.dialogType =  data.dialogType;
    this.message = data.message;
    this.messageTitle = data.messageTitle?data.messageTitle:data.dialogType=='error'?'Error':data.dialogType=='loading'?'Loading':'Message';
    this.okButton = data.okButton?data.okButton:'ACCEPT';
    this.cancelButton = data.cancelButton?data.cancelButton:'CANCEL';
  }

  ngOnInit() {
  }

  cancelAction(){
    if(this.data.action)
    this.data.action(false);
    this.dialogRef.close();
  }

  action(){
    if(this.data.action)
    this.data.action(true);
    this.dialogRef.close();
  }
}
