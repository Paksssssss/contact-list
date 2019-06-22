import { User } from './../users.model';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userSelected: User;
  userId: number;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userId = params.id;
        this.usersService.selectedUser.subscribe(
          (user:User) => {
            this.userSelected = user;
          }
        )
        this.usersService.initGetUser(params.id);
      }
    )
  }
  isUserUndefined() {
    return this.userSelected === undefined;
  }

}
