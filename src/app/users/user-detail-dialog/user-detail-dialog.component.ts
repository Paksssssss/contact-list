import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../users.model';

@Component({
  selector: 'user-detail-dialog',
  templateUrl: 'user-detail-dialog.component.html',
})
export class UserDetailDialog {

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}