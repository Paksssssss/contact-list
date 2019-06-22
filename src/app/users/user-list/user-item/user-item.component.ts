import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../users.model';
import { UsersService } from '../../users.service';
import { MatDialog } from '@angular/material';
import { UserDetailDialog } from '../../user-detail-dialog/user-detail-dialog.component';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor(private usersService: UsersService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog():void {
    const dialogRef = this.dialog.open(UserDetailDialog, {
      width: '500px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  // onUserSelect() {
  //   this.router.navigate()
  // }

  onEdit() {
    this.usersService.userEditing.emit(this.user);
  }

  onDelete() {
    this.usersService.deleteUser(this.user.id);
  }
}

