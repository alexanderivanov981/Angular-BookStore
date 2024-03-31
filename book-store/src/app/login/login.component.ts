import { Component } from '@angular/core';
import { UserService } from '../home/user.service';
import { User } from '../home/user';
import { AuthenticationService } from '../home/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService,
    private authentication: AuthenticationService,
    private router: Router) {}

  onLogin(username: string, password: string): void {
    this.userService.login(username, password).subscribe(
      (user: User) => {
        // Handle the user response here
        this.authentication.login();
        this.authentication.currentUserId = user.id;
        this.authentication.currentUsername = user.username;
        this.authentication.user = user;
        this.router.navigate(['/']);
        console.log('User found:', user);
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }

}
