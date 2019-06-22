import { User } from './../users/users.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) { }

  getUsersData() {
    return this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  addUserToApi(newUser: User) {
    return this.httpClient.post('https://jsonplaceholder.typicode.com/users', newUser);
  }

  getUserData(userId) {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  deleteUserData(userId) {
    return this.httpClient.delete('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  updateUserData(userId, newUser) {
    return this.httpClient.put('https://jsonplaceholder.typicode.com/users/' + userId, newUser);
  }
};