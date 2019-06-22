import { DataService } from './../shared/data-service.service';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from './users.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {
  userList: User[] = [];
  userListChanged: EventEmitter<User[]> = new EventEmitter();
  userIds: string[] = [];
  userEditing: EventEmitter<User> = new EventEmitter();
  userDeleted: EventEmitter<void> = new EventEmitter();
  selectedUser: EventEmitter<User> = new EventEmitter()

  constructor(private dataService: DataService,
              private router: Router) { }

  getUsers() {
    this.dataService.getUsersData().subscribe(
      data => {
        data.forEach((datum) => {
          this.userList.push(new User(datum.id, datum.name, datum.email, datum.phone));
          this.userIds.push(datum.id);
        })
        this.userListChanged.emit(this.userList.slice());
      }
    );
  }

  addUser(newUser) {
    newUser.id = this.getRandomID(100);
    this.userList.push(new User(newUser.id, newUser.name, newUser.email, newUser.contact));
    this.userIds.push(newUser.id);
    this.userListChanged.emit(this.userList.slice());
    this.dataService.addUserToApi(newUser).subscribe(
      (res: User) => console.log('User ' + res.name + ' Successfully added!')
    );
  }

  updateUser(newUser, userId: number) {
    this.userList = this.userList.map(user => {
      if (+user.id === +userId) {
        user = new User(userId, newUser.name, newUser.email, newUser.contact);
      }
      return user;
    });
    this.userListChanged.emit(this.userList);
    this.dataService.updateUserData(userId, newUser).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  getRandomID(max) {
    let randId = '0';
    while (this.userIds.includes(randId) || randId === '0') {
      randId = Math.floor((Math.random() * Math.floor(max)) + 10).toString();
    }
    return randId;
  }

  deleteUser(userId) {
    this.userList = this.userList.filter(user => {
      if (+user.id !== +userId) {
        return user;
      }
    })
    this.userListChanged.emit(this.userList.slice());
    this.userDeleted.emit();

    this.dataService.deleteUserData(userId).subscribe(
      res => console.log(res)
    )
  }

  initGetUser(userId: number) {
    let fetchedUser: User;
    const chosenOne = this.getUser(userId);

    if(chosenOne===undefined) {
      this.dataService.getUserData(userId).subscribe(
        (user: any) => {
          this.selectedUser.emit(new User(user.id, user.name, user.email, user.phone))
        },
        (err) => {
          if(err.status === 404) {
            const chosenOne = this.getUser(userId);
            this.selectedUser.emit(chosenOne);
          }
        }
      )
    } else {
      this.selectedUser.emit(chosenOne)
    }
  }

  getUser(userId: number) {
    let userData: User;
    this.userList.forEach(user => {
      if (+user.id === +userId) {
        userData = user;
      }
    });
    // console.log(this.userList)
    // this.dataService.getUserData(userId).subscribe(
    //   user => {
    //     console.log(user)
    //   }
    // )
    return userData;
  }
}