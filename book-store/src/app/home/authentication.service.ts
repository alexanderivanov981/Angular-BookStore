import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false; // Set to true when the user logs in
  currentUserId: number = 1;
  currentUsername: string = "";
  user!: User;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

}
