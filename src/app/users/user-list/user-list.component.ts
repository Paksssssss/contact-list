import { UsersService } from './../users.service';
import { DataService } from './../../shared/data-service.service';
import { User } from './../users.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.userListChanged.subscribe(
      users => this.userList = users
    );
  }

}
